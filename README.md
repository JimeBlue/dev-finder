# devfinder - GitHub user search app solution

**Live Site URL:** [https://lm-github-user-search.netlify.app/](https://dev-scout.netlify.app/)

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [User Story](#user-story)
  - [Expected behaviour](#expected-behaviour)
  - [Design](#design)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Featured Code](#featured-code)
- [Setup](#setup)
- [Usage](#usage)

## Overview

### User Story

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- Have the correct color scheme chosen for them based on their computer preferences.
- Persist theme with localStorage

### Expected behaviour

- On first load, show the profile information for NinjaInShade (me).
- Display an error message (as shown in the design) if no user is found when a new search is made.
- If a GitHub user hasn't added their name, show their username where the name would be without the `@` symbol and again below with the `@` symbol.
- If a GitHub user's bio is empty, show the text "This profile has no bio" with transparency added (as shown in the design). The lorem ipsum text in the designs shows how the bio should look when it is present.
- If any of the location, website, twitter, or company properties are empty, show the text "Not Available" with transparency added (as shown in the design).
- Website, twitter, and company information should all be links to those resaources. For the company link, it should remove the `@` symbol and link to the company page on GitHub. For Octocat, with `@github` being returned for the company, this would lead to a URL of `https://github.com/github`.

### Design

**Mobile**
<br />
<img width="506" alt="mobile" src="https://github.com/JimeBlue/dev-finder/assets/84801660/d92e83f3-1a25-4165-855e-962c1e4683f3">

**Tablet**
<br />
<img width="559" alt="tablet" src="https://github.com/JimeBlue/dev-finder/assets/84801660/cb28af44-1a38-4810-89c4-29ce7f7d8375">

**Desktop**
<br />
<img width="553" alt="desktop" src="https://github.com/JimeBlue/dev-finder/assets/84801660/ecded89f-444a-480d-82c0-8fe0b0a02c47">


## My process

### Built with


- Nuxt 3
- Vue 3
- Tailwind CSS
- Github API
- SCSS
- Iconify Icons
- Mobile-first workflow
- Semantic HTML5 markup

### Featured Code

#### - Use of Composables

Use composables **UseDarkMode** and **useGithubUsers** to encapsulate and reuse logic for the dark/light theme change and for interacting with the GitHub user data respectively.

UseDarkMode.js

```js
export const useDarkMode = () => {
  const darkMode = ref(false)

  //   applies the .dark class to the documentElement based on the darkMode value.
  const updateDarkModeClass = () => {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggles the theme and saves the user's preference in localStorage.
  // This allows the user to manually select their preferred theme, overriding the system preference.
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value ? 'dark' : 'light')
    updateDarkModeClass()
  }

  onMounted(() => {
    // Check for saved theme in localStorage and system preference
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      darkMode.value = savedTheme === 'dark'
    } else {
      // If no saved theme, use system preference
      darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateDarkModeClass()
  })

  watch(darkMode, (newValue) => {
    updateDarkModeClass()
  })

  return {
    darkMode,
    toggleDarkMode,
  }
}

```

useGithubUsers.js

```js
export const useGithubUsers = (initialUsername = '') => {
  const config = useRuntimeConfig()
  const username = ref('')
  const userNotFound = ref(false)
  const emptySearch = ref(false)
  const debouncedLoading = ref(false)

  const apiUrl = computed(() =>
    username.value ? `${config.public.githubUsersApi}/${username.value}` : null,
  )

  let debounceTimer

  const setDebouncedLoading = (value, delay = 500) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedLoading.value = value
    }, delay)
  }

  const {
    data: user,
    pending,
    error,
    refresh,
  } = useAsyncData(() => {
    if (apiUrl.value) {
      // Start debounced loading
      setDebouncedLoading(true)

      return $fetch(apiUrl.value)
        .then((response) => {
          // Stop debounced loading
          setDebouncedLoading(false)
          return response
        })
        .catch((err) => {
          setDebouncedLoading(false)

          if (err.response && err.response.status === 404) {
            userNotFound.value = true
            return null
          }
          throw err
        })
    }
  })

  const searchUser = (searchUsername) => {
    // Reset the states at the beginning of each search
    emptySearch.value = !searchUsername.trim()
    userNotFound.value = false

    // Handle empty search
    if (emptySearch.value) {
      user.value = null // Also reset the user value for an empty search
      return
    }

    // Proceed with a normal search
    username.value = searchUsername
    refresh()
  }

  if (initialUsername) {
    searchUser(initialUsername)
  }

  return {
    user,
    pending,
    error,
    searchUser,
    userNotFound,
    emptySearch,
    debouncedLoading,
  }
}

```


## Setup

To get started with the Nuxt 3 Minimal Starter, first install the dependencies. Choose the package manager you prefer:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Usage

**Development Server:**

To start the development server, run the following command. Your application will be available at http://localhost:3000:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

**Production:**

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
