<template>
  <section>
    <h1>GitHub Users</h1>
    <form @submit.prevent="triggerSearch">
      <input v-model="searchUsername" placeholder="Enter GitHub username" />
      <button type="submit">Search</button>
    </form>
    <UserProfile :user="user" :loading="pending" :error="apiError" />
  </section>
</template>

<script setup>
const { user, pending, error, searchUser, userNotFound } = useGithubUsers()

const searchUsername = ref('')

const apiError = computed(() => {
  if (userNotFound.value) {
    return 'No results'
  } else if (error.value) {
    return 'An error occurred.'
  }
  return null
})

const triggerSearch = () => {
  searchUser(searchUsername.value)
}
</script>
