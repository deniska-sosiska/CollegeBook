import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.accountData === null) {
      next({
        path: '/Authorization/',
        query: {  redirect: to.fullPath  }
      })
    }
    else {  next()  }
  }
  else {  next()  }
})

export default router