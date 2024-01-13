<template>
  <section class="text-blue-500 dark:text-white">
    <form @submit.prevent="triggerSearch">
      <input v-model="searchUsername" placeholder="Enter GitHub username" />
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <div class="user-profile-skin">
      <UserProfile :user="user" :loading="pending" :error="apiError" />
    </div>
  </section>
</template>

<script setup>
const { user, pending, error, searchUser, userNotFound } =
  useGithubUsers('JimeBlue')

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
