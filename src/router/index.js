import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/editor/:id',
    name: 'editor',
    component: () => import('@/views/EditorPage.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
