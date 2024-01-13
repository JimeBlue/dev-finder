export const useGithubUsers = (initialUsername = '') => {
  const config = useRuntimeConfig()
  const username = ref('')
  const userNotFound = ref(false)

  const apiUrl = computed(() =>
    username.value ? `${config.public.githubUsersApi}/${username.value}` : null,
  )

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
          searchUser(initialUsername) // Call searchUser with default username
          return null
        }
        throw err
      })
    }
  })

  const searchUser = (searchUsername) => {
    if (!searchUsername.trim()) {
      // If the search query is empty, use the default user
      username.value = initialUsername
    } else {
      username.value = searchUsername
    }
    userNotFound.value = false
    refresh()
  }

  if (initialUsername) {
    searchUser(initialUsername)
  }

  return { user, pending, error, searchUser, userNotFound }
}
