<template>
  <div v-if="loading">
    <LoaderSkeleton />
  </div>

  <div
    v-if="user"
    class="py-8 md:py-14 px-6 md:px-10 md:grid md:grid-cols-12 md:gap-6"
  >
    <!-- NOTE: user header -->
    <section class="hidden md:block md:col-span-2">
      <img
        :src="user.avatar_url"
        :alt="`Avatar for ${user.login}`"
        class="rounded-full"
      />
    </section>

    <section class="md:col-span-10">
      <header class="flex space-x-4 md:space-x-0">
        <img
          :src="user.avatar_url"
          :alt="`Avatar for ${user.login}`"
          class="md:hidden w-[70px] h-[70px] rounded-full"
        />
        <hgroup
          class="mb-7 min-[855px]:w-full min-[855px]:flex min-[855px]:justify-between"
        >
          <div>
            <h1
              class="text-base md:text-2xl font-bold text-blue-gray-800 dark:text-white"
            >
              <span v-if="user.name">{{ user.name }}</span
              ><span v-else>{{ user.login }}</span>
            </h1>
            <p class="text-sm md:text-base text-primary">@{{ user.login }}</p>
          </div>
          <time class="text-sm md:text-base"> Joined {{ joinedDate }} </time>
        </hgroup>
      </header>
      <!-- NOTE: user bio -->
      <article class="text-sm md:text-base mb-6">
        <ul v-if="bioItems.length > 0">
          <li v-for="(item, index) in bioItems" :key="index">
            {{ item }}
          </li>
        </ul>
        <p v-else class="text-gray-400">This profile has no bio.</p>
      </article>
      <!-- NOTE: user stats -->
      <ul
        class="bg-blue-100 dark:bg-gray-900 rounded-xl flex items-center justify-between py-4 px-6 mb-7"
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
      <!-- NOTE: user links -->
      <ul
        class="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:grid-rows-2 md:gap-y-0 md:gap-4"
      >
        <li
          v-for="(item, index) in userLinksData"
          :key="index"
          class="flex items-center space-x-4 text-sm md:text-base"
          :class="{ 'text-gray-400': item.disabled }"
        >
          <iconify-icon :icon="item.icon" height="20" width="20"></iconify-icon>
          <p v-if="item.isLocation">{{ item.text }}</p>
          <a
            v-else-if="item.url"
            :href="item.url"
            target="_blank"
            class="hover:underline truncate"
            >{{ item.link }}</a
          >
          <span v-else :class="{ 'text-gray-400': item.disabled }">{{
            item.link
          }}</span>
        </li>
      </ul>
    </section>
  </div>
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

// Data for user links section
const userLinksData = computed(() => {
  const formatCompanyUrl = (company) => {
    if (!company) return null

    // Remove any characters that are not allowed in GitHub usernames
    // GitHub usernames can only have alphanumeric characters or hyphens and cannot begin with a hyphen
    const sanitized = company.replace(/^[^\w-]+|[^0-9a-zA-Z-]+/g, '')

    return `https://github.com/${sanitized}`
  }

  const formatTwitterUrl = (username) => {
    if (!username) return null

    // Username does not contain '@' symbol already
    return `https://twitter.com/${username}`
  }

  const formatBlogUrl = (url) => {
    if (!url) return null

    // Remove 'http://' or 'https://' from the URL
    return url.replace(/^https?:\/\//, '')
  }

  const blogUrl = formatBlogUrl(props.user.blog)
  // Creates an array of objects for user links section
  const data = [
    {
      icon: 'mdi:location',
      link: '',
      disabled: !props.user.location,
      url: '',
      isLocation: true,
      text: props.user.location ? props.user.location : 'Not Available',
    },
    {
      icon: 'mdi:twitter',
      link: props.user.twitter_username
        ? props.user.twitter_username
        : 'Not Available',
      disabled: !props.user.twitter_username,
      url: formatTwitterUrl(props.user.twitter_username),
      isLocation: false,
      text: '',
    },
    {
      icon: 'pepicons-pop:chain',
      link: blogUrl ? blogUrl : 'Not Available', // Display formatted URL or 'Not Available'
      disabled: !blogUrl,
      url: props.user.blog, // Keep the original URL for the actual link
      isLocation: false,
      text: '',
    },
    {
      icon: 'fluent:building-20-filled',
      link: props.user.company ? props.user.company : 'Not Available',
      disabled: !props.user.company,
      url: formatCompanyUrl(props.user.company),
      isLocation: false,
      text: '',
    },
  ]
  return data
})
</script>
