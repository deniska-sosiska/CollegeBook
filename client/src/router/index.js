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
    if (!localStorage.accountData) { // if user not authorized => redirect to SignIn component 
      next({
        path: "SignIn",
        query: {  redirect: to.fullPath  }
      })
    }
    else {  next()  }
  }
  else {  
    //if user authorized => he should not see SignIn page
    if (localStorage.accountData && (to.name === 'SignIn' || to.name === 'SignUp'))
      next({
        name: 'Spesialties',
        query: {  redirect: to.fullPath  }
      })
    else {  next()  }
  }
})

export default router