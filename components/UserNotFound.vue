<template>
  <article class="flex flex-col space-y-4 text-center">
    <h2
      class="text-base md:text-xl font-bold text-blue-gray-800 dark:text-white"
    >
      Whoops no results!
    </h2>
    <NuxtImg
      src="/images/not-found.png"
      class="w-1/2 md:w-3/12 mx-auto"
      alt="computer with sad face"
    />

    <p class="text-base md:text-base text-blue-gray-800 dark:text-white">
      Sorry but nothing match your search. Please try again with a different
      user name.
    </p>
  </article>
</template>
