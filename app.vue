<template>
  <div class="bg-blue-100 dark:bg-gray-900 min-h-screen">
    <div class="container pt-6 md:pt-16">
      <SiteHeader />
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
const { darkMode, toggleDarkMode } = useDarkMode()
</script>
