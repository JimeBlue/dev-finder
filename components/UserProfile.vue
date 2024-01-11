<template>
  <section v-if="loading">Loading...</section>
  <section v-else-if="error">{{ error }}</section>
  <section v-if="user">
    <hgroup>
      <h1>
        <span v-if="user.name">{{ user.name }}</span
        ><span v-else>{{ user.login }}</span>
      </h1>
      <h2>@{{ user.login }}</h2>
      <p class="text-blue-500 dark:text-slate-900">Joined {{ joinedDate }}</p>
    </hgroup>
    <img :src="user.avatar_url" :alt="`Avatar for ${user.login}`" width="100" />
    <ul>
      <li v-for="(item, index) in bioItems" :key="index">
        {{ item }}
      </li>
    </ul>

    <ul
      class="bg-blue-100 dark:bg-gray-900 rounded-xl py-4 px-6 flex items-center justify-between"
    >
      <li v-for="(item, index) in statsData" :key="index">
        <h3 class="text-xs sm:text-sm">{{ item.label }}</h3>
        <p
          class="text-base sm:text-xl font-bold text-blue-gray-800 dark:text-white"
        >
          {{ item.value }}
        </p>
      </li>
    </ul>
    <ul>
      <li v-if="user.location">Location: {{ user.location }}</li>
      <li v-if="user.twitter_username">Twitter: {{ user.twitter_username }}</li>
      <li v-if="user.blog">Blog: {{ user.blog }}</li>
      <li v-if="user.company">Company: {{ user.company }}</li>
    </ul>
  </section>
</template>

<script setup>
useDarkMode()
const props = defineProps({
  user: Object,
  loading: Boolean,
  error: String,
})

// formats date
const joinedDate = computed(() => {
  return props.user && props.user.created_at
    ? new Date(props.user.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''
})

// Split the bio into an array of items
const bioItems = computed(() => {
  // Check if bio is not null and is a string before splitting. If bio is null, return an empty array to avoid errors
  return props.user && props.user.bio && typeof props.user.bio === 'string'
    ? props.user.bio.split('\r\n').filter(Boolean)
    : []
})

// Creates an array of objects for user stats section
const statsData = computed(() => {
  const data = [
    {
      label: 'Repos',
      value: props.user ? props.user.public_repos : 0,
    },
    {
      label: 'Followers',
      value: props.user ? props.user.followers : 0,
    },
    {
      label: 'Following',
      value: props.user ? props.user.following : 0,
    },
  ]
  return data
})
</script>
