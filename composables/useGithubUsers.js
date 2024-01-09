export const useGithubUsers = () => {
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
          return null
        }
        throw err
      })
    }
  })

  const searchUser = (searchUsername) => {
    userNotFound.value = false
    username.value = searchUsername // Update the username ref with the new username
    refresh()
  }

  // Initialize the user profile with 'jime' on creation
  searchUser('jimeblue')

  return { user, pending, error, searchUser, userNotFound }
}
