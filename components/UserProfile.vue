<template>
  <section v-if="loading">Loading...</section>
  <section v-else-if="error">{{ error }}</section>
  <section v-if="user">
    <pre> {{ user }} </pre>
    <hgroup>
      <h1>
        <span v-if="user.name">{{ user.name }}</span
        ><span v-else>{{ user.login }}</span>
      </h1>
      <h2>@{{ user.login }}</h2>
      <p>Joined {{ joinedDate }}</p>
    </hgroup>
    <img :src="user.avatar_url" :alt="`Avatar for ${user.login}`" width="100" />
    <ul>
      <li v-for="(item, index) in bioItems" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li>{{ user.public_repos }} Repositories</li>
      <li>{{ user.followers }} Followers</li>
      <li>{{ user.following }} Following</li>
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
</script>
