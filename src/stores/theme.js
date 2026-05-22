import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('dark')

  async function init() {
    try {
      if (window.electronAPI) {
        const settings = await window.electronAPI.readSettings()
        theme.value = settings.theme || 'dark'
      }
    } catch (e) {
      // Fallback for browser dev without Electron
    }
    apply(theme.value)
  }

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply(theme.value)
    try {
      if (window.electronAPI) {
        window.electronAPI.writeSettings({ theme: theme.value })
      }
    } catch (e) { /* ignore */ }
  }

  function apply(t) {
    document.documentElement.setAttribute('data-theme', t)
  }

  return { theme, init, toggle }
})
