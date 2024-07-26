import { defineStore } from 'pinia'
import type { ConfigProviderTheme } from 'vant'

export interface AppStore {
  switchScroll: (val: boolean) => void
  swithMode: (val: ConfigProviderTheme) => void
}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const useAppStore = defineStore(
  'app',
  () => {
    const theme = prefersDark ? 'dark' : 'light'
    const mode = ref<ConfigProviderTheme>(theme)

    const swithMode = (val: ConfigProviderTheme) => {
      mode.value = val
    }

    const scroll = ref<boolean>(true)
    const switchScroll = (value) => {
      scroll.value = value
    }
    watchEffect(() => {
      document.body.style.overflow = scroll.value ? 'auto' : 'hidden'
    })

    return {
      mode,
      swithMode,
      switchScroll,
    }
  },
  {
    persist: true,
  },
)

export default useAppStore
