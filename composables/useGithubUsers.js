export const useGithubUsers = () => {
  const apiUrl = process.env.GITHUB_USERS_API

  const {
    data: users,
    pending,
    error,
    refresh,
  } = useAsyncData(() => {
    return $fetch(apiUrl)
  })

  return { users, pending, error, refresh }
}
