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
