// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
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
})
