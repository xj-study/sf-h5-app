<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from '@/stores/modules/app'
import useRouteCache from '@/stores/modules/routeCache'
import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import useAutoThemeSwitcher from '@/hooks/useAutoThemeSwitcher'

useHead({
  title: 'FS-代号007',
  meta: [
    {
      name: 'description',
      content: 'FS-代号007',
    },
    {
      name: 'theme-color',
      content: () => (isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => (preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

const appStore = useAppStore()
const { mode } = storeToRefs(appStore)

const routeTransitionNameStore = useRouteTransitionNameStore()
const { routeTransitionName } = storeToRefs(routeTransitionNameStore)
const { initializeThemeSwitcher } = useAutoThemeSwitcher(appStore)

const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[]
})

onMounted(() => {
  initializeThemeSwitcher()
})
</script>

<template>
  <van-config-provider :theme="mode">
    <base-nav-bar />
    <router-view v-slot="{ Component, route }">
      <transition :name="routeTransitionName">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
    <base-tab-bar />
  </van-config-provider>
</template>
