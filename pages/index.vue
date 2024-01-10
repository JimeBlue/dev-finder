<template>
  <section class="text-blue-500 dark:text-white">
    <header class="flex justify-between">
      <h1 class="text-2xl text-blue-gray-800 dark:text-white font-bold">
        devfinder
      </h1>
      <button
        @click="toggleDarkMode"
        class="flex space-x-4 items-center text-sm transition duration-300"
        :class="
          darkMode
            ? 'text-white hover:text-blue-gray-300'
            : 'text-blue-gray-400 hover:text-blue-gray-800'
        "
      >
        <span>
          {{ darkMode ? 'LIGHT' : 'DARK' }}
        </span>
        <IconsMoon v-if="darkMode" />
        <IconsSun v-else />
      </button>
    </header>
    <form @submit.prevent="triggerSearch">
      <input v-model="searchUsername" placeholder="Enter GitHub username" />
      <button type="submit" class="btn btn-primary">Search</button>
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
