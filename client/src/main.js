import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import store from './store/index'

import App from './App.vue'
import ChooseGroups from './components/Choose-groups.vue'
import ChooseGroup from './components/Choose-group.vue'
import ChooseMagazines from './components/Choose-magazines.vue'
import academicAttendance from './components/Academic-attendance.vue'
import academicAttendanceInfo from './components/Academic-attendance-info.vue'
import signIn from "./components/Authorization/Sign-in.vue"
import signUP from "./components/Authorization/Sign-up.vue"

const router  = new VueRouter({
  routes: [
    {  path: '/', component: ChooseGroups  },
    {  path: '/Authorization/', component: signIn  },
    {  path: '/Authorization/signUP', component: signUP  },
    {  path: '/:specialty/', component: ChooseGroup, props: true, meta: {  requiresAuth: true  }  },
    {  path: '/:specialty/:group/', component: ChooseMagazines, props: true, meta: {  requiresAuth: true  } },
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
    else {
      next()
    }
  }
  else {
    next()
  }
})

Vue.config.productionTip = false
Vue.use(VueRouter, VueAxios, axios)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
