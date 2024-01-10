<template>
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
</template>
<script setup>
const { darkMode, toggleDarkMode } = useDarkMode()
</script>
