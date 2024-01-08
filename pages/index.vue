<template>
  <section>
    <h1>GitHub Users</h1>
    <input
      v-model="searchUsername"
      placeholder="Enter GitHub username"
      @input="refresh"
    />
    <UserProfile :user="user" :loading="pending" :error="apiError" />
  </section>
</template>

<script setup>
const searchUsername = ref('octocat')
const { user, pending, error, refresh, userNotFound } =
  useGithubUsers(searchUsername)

// Computes type of error from API
const apiError = computed(() => {
  if (userNotFound.value) {
    return 'No results'
  } else if (error.value) {
    return 'An error occurred.'
  }
  return null
})
</script>
