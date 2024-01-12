<template>
  <div class="bg-blue-100 dark:bg-gray-900">
    <div class="container">
      <SiteHeader />
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
const { darkMode, toggleDarkMode } = useDarkMode()
</script>
