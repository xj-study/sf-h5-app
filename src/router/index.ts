import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
// import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import useRouteCacheStore from '@/stores/modules/routeCache'
import useUserStore from '@/stores/modules/user'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((to: EnhancedRouteLocation, from, next) => {
  NProgress.start()

  if (!to.meta.common) {
    const userStore = useUserStore()
    if (!userStore.token) {
      router.push('/login')
      return
    }
  }

  const routeCacheStore = useRouteCacheStore()
  // const routeTransitionNameStore = useRouteTransitionNameStore()

  // Route cache
  routeCacheStore.addRoute(to)

  // if (to.meta.level > from.meta.level)
  //   routeTransitionNameStore.setName('slide-fadein-left')

  // else if (to.meta.level < from.meta.level)
  //   routeTransitionNameStore.setName('slide-fadein-right')

  // else
  //   routeTransitionNameStore.setName('')

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
