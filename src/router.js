import { CreatePage, Home } from './views/*'

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/create',
    component: CreatePage,
    props: (route) => ({ folder: route.query.folder }),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach(async (to, from, next) => {
  await store.restored
  next()
})

export default router
