import debounce from 'lodash.debounce'
export const useGithubUsers = (githubUsername) => {
  const config = useRuntimeConfig()
  const username = ref(githubUsername)
  // Computed property for the API URL
  const apiUrl = computed(() => {
    return username.value
      ? `${config.public.githubUsersApi}/${username.value}`
      : null
  })
  const {
    data: user,
    pending,
    error,
    refresh,
  } = useAsyncData(() => {
    // Make sure the apiUrl is not null
    if (apiUrl.value) {
      return $fetch(apiUrl.value)
    }
  })
  // Debounce the refresh function
  const debouncedRefresh = debounce(refresh, 500)
  // Watch the apiUrl and call the debounced refresh function
  watchEffect(() => {
    if (apiUrl.value) {
      debouncedRefresh()
    }
  })
  return { user, pending, error, refresh: debouncedRefresh }
}
