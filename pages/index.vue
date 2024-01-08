<template>
  <section>
    <h1>GitHub Users</h1>

    <input
      v-model="searchUsername"
      placeholder="Enter GitHub username"
      @input="refresh"
    />

    <div v-if="pending">Loading...</div>
    <div v-else-if="apiError">{{ apiError }}</div>
    <div v-else-if="user">
      <h2>{{ user.name }} (@{{ user.login }})</h2>
      <img
        :src="user.avatar_url"
        :alt="`Avatar for ${user.login}`"
        width="100"
      />

      <p>Location: {{ user.location }}</p>

      <!-- ...other user info... -->
    </div>
  </section>
</template>
<script setup>
const searchUsername = ref('octocat') // Start with a default username
const { user, pending, error, refresh, userNotFound } =
  useGithubUsers(searchUsername)
// Checks type of error from API
const apiError = computed(() => {
  if (error.value) {
    return error.value.response && error.value.response.status === 404
      ? 'No results'
      : 'An error occurred.'
  }
  return null
})
</script>
