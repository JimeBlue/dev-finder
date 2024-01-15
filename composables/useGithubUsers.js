export const useGithubUsers = (initialUsername = '') => {
  const config = useRuntimeConfig()
  const username = ref('')
  const userNotFound = ref(false)
  const emptySearch = ref(false)
  const debouncedLoading = ref(false)

  const apiUrl = computed(() =>
    username.value ? `${config.public.githubUsersApi}/${username.value}` : null,
  )

  let debounceTimer

  const setDebouncedLoading = (value, delay = 500) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedLoading.value = value
    }, delay)
  }

  const {
    data: user,
    pending,
    error,
    refresh,
  } = useAsyncData(() => {
    if (apiUrl.value) {
      // Start debounced loading
      setDebouncedLoading(true)

      return $fetch(apiUrl.value)
        .then((response) => {
          // Stop debounced loading
          setDebouncedLoading(false)
          return response
        })
        .catch((err) => {
          setDebouncedLoading(false)

          if (err.response && err.response.status === 404) {
            userNotFound.value = true
            return null
          }
          throw err
        })
    }
  })

  const searchUser = (searchUsername) => {
    // Reset the states at the beginning of each search
    emptySearch.value = !searchUsername.trim()
    userNotFound.value = false

    // Handle empty search
    if (emptySearch.value) {
      user.value = null // Also reset the user value for an empty search
      return
    }

    // Proceed with a normal search
    username.value = searchUsername
    refresh()
  }

  if (initialUsername) {
    searchUser(initialUsername)
  }

  return {
    user,
    pending,
    error,
    searchUser,
    userNotFound,
    emptySearch,
    debouncedLoading,
  }
}
