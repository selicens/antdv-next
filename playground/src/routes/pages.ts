import type { RouteRecordRaw } from 'vue-router'

export const pagesRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/icons',
    component: () => import('@/pages/icons/index.vue'),
  },
]
