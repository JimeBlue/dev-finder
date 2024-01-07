<template>
  <section>
    <h1>GitHub Users</h1>

    <input
      v-model="searchUsername"
      placeholder="Enter GitHub username"
      @input="refresh"
    />

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">An error occurred: {{ error.message }}</div>
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
    <div v-else>No user data available. Please search for a GitHub user.</div>
  </section>
</template>
<script setup>
const searchUsername = ref('octocat') // Start with a default username
const { user, pending, error, refresh } = useGithubUsers(searchUsername)
</script>
