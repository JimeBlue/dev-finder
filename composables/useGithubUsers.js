export const useGithubUsers = (githubUsername) => {
  const config = useRuntimeConfig()
  // Make username a ref and initialize with the initialUsername or 'octocat'
  const username = ref(githubUsername || 'octocat')
  const apiUrl = ref(`${config.public.githubUsersApi}/${username.value}`)

  const {
    data: user,
    pending,
    error,
    refresh,
  } = useAsyncData(() => $fetch(apiUrl.value), { watch: username })

  // Watch the username ref for changes and update the apiUrl accordingly
  watch(username, (newUsername) => {
    apiUrl.value = `${config.public.githubUsersApi}/${newUsername}`
    // Use refresh() here to re-fetch the data whenever the username changes.
    refresh()
  })

  return { user, pending, error, refresh }
}
