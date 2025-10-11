import { createRouter, createWebHistory } from 'vue-router'
import { generateDemoRoutes } from '@/routes/demos'
import { pagesRoutes } from '@/routes/pages'

export const router = createRouter({
  routes: [
    ...pagesRoutes,
    ...generateDemoRoutes(),
  ],
  history: createWebHistory(),
})
