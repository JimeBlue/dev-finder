<template>
  <section>
    <h1>GitHub Users</h1>

    <input
      v-model="searchUsername"
      placeholder="Enter GitHub username"
      @input="refresh"
    />

    <article>
      <div v-if="pending">Loading...</div>
      <div v-else-if="apiError">{{ apiError }}</div>
      <div v-else-if="user">
        <hgroup>
          <h1>{{ user.name }}</h1>
          <h2>@{{ user.login }}</h2>
          <p>Joined {{ formattedDate }}</p>
        </hgroup>
        <img
          :src="user.avatar_url"
          :alt="`Avatar for ${user.login}`"
          width="100"
        />
        <ul>
          <li v-for="(item, index) in bioItems" :key="index">
            {{ item }}
          </li>
        </ul>
        <ul>
          <li>{{ user.public_repos }}</li>
          <li>{{ user.followers }}</li>
          <li>{{ user.following }}</li>
        </ul>
        <ul>
          <li>Location: {{ user.location }}</li>
          <li>Twitter: {{ user.twitter_username }}</li>
          <li>blog: {{ user.blog }}</li>
          <li>company: {{ user.company }}</li>
        </ul>
      </div>
    </article>
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
// formats date
const formattedDate = computed(() => {
  const date = new Date(user.value.created_at)
  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, ' ')
})

// Split the bio into an array of items
const bioItems = computed(() => {
  // Check if bio is not null and is a string before splitting
  if (user.value.bio && typeof user.value.bio === 'string') {
    return user.value.bio.split('\r\n').filter(Boolean) // This filters out any empty strings
  }
  return [] // If bio is null, return an empty array to avoid errors
})
</script>
