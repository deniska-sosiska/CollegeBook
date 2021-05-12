import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.accountData) {
      next({
        path: '/Authorization/SignIn',
        query: {  redirect: to.fullPath  }
      })
    }
    else {  next()  }
  }
  else {  next()  }
})

export default router