// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Github Dev Finder',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Our app revolutionizes the way you search for GitHub users. Tailored for developers, recruiters, and open-source enthusiasts, it offers a sleek, user-friendly interface that allows you to search GitHub users by various criteria including usernames, repositories, and programming languages. Leveraging the GitHub API, our app ensures real-time, accurate data retrieval. Standout features include bookmarking profiles, user comparison tools, and detailed analytics. Prioritizing user privacy, we ensure secure data handling. Whether you are on a mobile device or browsing on the web, our app provides a seamless experience. Join our growing community, contribute to future developments, and start exploring the vast world of GitHub users today!',
        },
      ],
    },
  },
  modules: ['@nuxt/image'],

  devtools: { enabled: true },
  alias: { '@': resolve(__dirname, '/') },
  css: ['~/assets/css/index.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // Public runtime config
    public: {
      githubUsersApi:
        process.env.GITHUB_USERS_API || 'https://api.github.com/users',
    },
    // Private runtime config (server-side only)
    private: {
      // Example: privateApiKey: process.env.PRIVATE_API_KEY,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
  plugins: [{ src: '~/plugins/iconify-icon.client.js', mode: 'client' }],
})
