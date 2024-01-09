<template>
  <section>
    <button @click="toggleDarkMode">
      <span v-if="!darkMode" class="inline-flex"
        ><span>light</span> <IconsSun class="w-8 h-8 text-red-500"
      /></span>
      <span v-if="darkMode" class="inline-flex"
        ><span>dark</span> <IconsMoon class="w-8 h-8 text-red-500"
      /></span>
    </button>
    <h1 class="text-blue-500 dark:text-slate-900">GitHub Users</h1>
    <form @submit.prevent="triggerSearch">
      <input v-model="searchUsername" placeholder="Enter GitHub username" />
      <button type="submit">Search</button>
    </form>
    <UserProfile :user="user" :loading="pending" :error="apiError" />
  </section>
</template>

<script setup>
const { darkMode, toggleDarkMode } = useDarkMode()
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
