import VueRouter from 'vue-router'
import store from '../store'

import Specialties from '../components/Specialties.vue'
import Groups from '../components/Groups.vue'
import Magazines from '../components/Magazines.vue'
import academicAttendance from '../components/Academic-attendance/Academic-attendance.vue'
import academicAttendanceInfo from '../components/Academic-attendance/Academic-attendance-info.vue'
import signIn from "../components/Authorization/Sign-in.vue"
import signUP from "../components/Authorization/Sign-up.vue"

const router  = new VueRouter({
  routes: [
    {  path: '/', component: Specialties  },
    {  path: '/Authorization/', component: signIn  },
    {  path: '/Authorization/signUP', component: signUP  },
    {  path: '/:specialty/:idSpecialty', component: Groups, props: true, meta: {  requiresAuth: true  }  },
    {  path: '/:specialty/:group/', component: Magazines, props: true, meta: {  requiresAuth: true  } },
    {  path: '/:specialty/:group/:magazines', component: academicAttendance, props: true, meta: {  requiresAuth: true  }  },
    {  path: '/:specialty/:group/:magazines/info', component: academicAttendanceInfo, props: true, meta: {  requiresAuth: true  }  }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getUser === null) {
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