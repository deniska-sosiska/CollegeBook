import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  const accountData = localStorage.accountData ? JSON.parse(localStorage.accountData) : null

  // if user not authorized => redirect to SignIn component
  if(to.matched.some(record => record.meta.requiresAuth && !accountData)) {
    store.commit('clearAccountData')
    next({
      name: "SignIn",
      query: {  redirect: to.fullPath  }
    })
  }   
  // Admin panel
  else if (to.matched.some(record => record.meta.accountAdmin) && accountData.role !== "Admin") { 
    store.commit('clearAccountData')
    next({
      name: "SignIn",
      query: {  redirect: to.fullPath  }
    })
  }
  //if user authorized => he should not see SignIn page
  else {  
    if (accountData && (to.name === 'SignIn' || to.name === 'SignUp'))
      next({
        name: 'Spesialties',
        query: {  redirect: to.fullPath  }
      })
    else {  next()  }
  }
})

export default router