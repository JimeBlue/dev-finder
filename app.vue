<template>
  <div class="bg-blue-100 dark:bg-gray-900">
    <SiteHeader />
    <NuxtPage />
  </div>
</template>
<script setup>
const { darkMode, toggleDarkMode } = useDarkMode()
</script>
