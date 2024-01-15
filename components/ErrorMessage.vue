<template>
  <article
    v-if="apiError === 'No results'"
    class="flex flex-col space-y-4 text-center"
  >
    <h2
      class="text-base md:text-xl font-bold text-blue-gray-800 dark:text-white"
    >
      Whoops {{ apiError }}!
    </h2>
    <img
      src="/images/not-found.png"
      class="w-1/2 md:w-3/12 mx-auto"
      alt="computer with sad face"
    />

    <p class="text-base md:text-base text-blue-gray-800 dark:text-white">
      Sorry but nothing match your search. Please try again with a different
      user name.
    </p>
  </article>
  <article v-else class="flex flex-col space-y-4 text-center">
    <h2
      class="text-base md:text-xl font-bold text-blue-gray-800 dark:text-white"
    >
      Whoops {{ apiError }}!
    </h2>
    <img
      src="/images/error.png"
      class="w-1/2 md:w-3/12 mx-auto"
      alt="computer dead face"
    />

    <p class="text-base md:text-base text-blue-gray-800 dark:text-white">
      Please refresh your page and try again.
    </p>
  </article>
</template>
<script setup>
const props = defineProps({
  apiError: String,
})
</script>
