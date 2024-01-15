<template>
  <div
    aria-label="Loading"
    aria-busy="true"
    aria-live="polite"
    class="py-8 px-6 md:px-10"
  >
    <div class="animate-pulse space-y-4">
      <div class="flex items-center space-x-4 p-4">
        <div class="bg-gray-200 rounded-full h-20 w-20"></div>
        <div class="flex-1 space-y-3 py-1">
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
</template>
