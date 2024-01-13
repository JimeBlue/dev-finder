<template>
  <div class="text-blue-500 dark:text-white space-y-4">
    <section class="section-skin mt-4 md:mt-6">
      <form
        @submit.prevent="triggerSearch"
        class="flex items-center justify-between py-2 px-2 md:px-0 md:pr-2 md:pl-6"
      >
        <div class="flex items-center space-x-2 sm:space-x-4 w-full">
          <iconify-icon
            icon="iconamoon:search-light"
            height="22"
            width="22"
            class="text-primary"
          ></iconify-icon>
          <label for="searchUsernameInput" class="sr-only"
            >Search GitHub username</label
          >
          <input
            type="text"
            id="searchUsernameInput"
            name="search"
            v-model="searchUsername"
            placeholder="Search GitHub username..."
            class="input-text"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-1">Search</button>
      </form>
    </section>
    <section class="section-skin">
      <UserProfile :user="user" :loading="pending" :error="apiError" />
    </section>
  </div>
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
  if (!searchUsername.value.trim()) {
    searchUser('JimeBlue') // Default user when search is empty
  } else {
    searchUser(searchUsername.value)
  }
}
</script>
