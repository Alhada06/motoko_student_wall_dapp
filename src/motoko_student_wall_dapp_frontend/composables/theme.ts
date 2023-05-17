export const useTheme = () => {
  const isDarkDaisyUi = useDark({
    attribute: 'data-theme',
    valueDark: 'night',
    valueLight: 'winter',
    storageKey: 'app-theme-appearance'
  })
  const isDarkTailwind = useDark({ storageKey: 'app-theme-appearance-tail' })
  const toggleDarkDaisyUi = useToggle(isDarkDaisyUi)
  const toggleDarkTailwind = useToggle(isDarkTailwind)

  const toggleTheme = () => {
    setTimeout(() => {
      toggleDarkDaisyUi()
      toggleDarkTailwind()
    }, 200)
  }
  const isDark = computed(() => isDarkDaisyUi && isDarkTailwind)

  return { isDark, toggleTheme, isDarkDaisyUi, isDarkTailwind }
}
