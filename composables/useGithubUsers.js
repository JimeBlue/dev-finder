import debounce from 'lodash.debounce'

export const useGithubUsers = (githubUsername) => {
  const config = useRuntimeConfig()
  const username = ref(githubUsername)
  const userNotFound = ref(false)

  // Define the API URL as a computed property
  const apiUrl = computed(() =>
    username.value ? `${config.public.githubUsersApi}/${username.value}` : null,
  )

  // Fetch user data and handle errors
  const {
    data: user,
    pending,
    error,
    refresh,
  } = useAsyncData(() => {
    if (apiUrl.value) {
      return $fetch(apiUrl.value).catch((err) => {
        if (err.response && err.response.status === 404) {
          userNotFound.value = true
          return null
        }
        throw err
      })
    }
  })

  // Debounce the refresh function
  const debouncedRefresh = debounce(refresh, 500)

  // Watch for changes in the username and refresh the data
  watch(username, () => {
    userNotFound.value = false // Reset the user not found state
    debouncedRefresh()
  })

  return { user, pending, error, refresh: debouncedRefresh, userNotFound }
}
