import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import ChooseGroups from './components/Choose-groups.vue'
import ChooseGroup from './components/Choose-group.vue'
import ChooseMagazines from './components/Choose-magazines.vue'
import ChooseAcademicAttendance from './components/Academic-attendance.vue'
import Authorization from './components/Authorization/Authorization.vue'


const router  = new VueRouter({
  routes: [
    {  path: '/', component: ChooseGroups },
    {  path: '/Authorization/', component: Authorization},
    {  path: '/:specialty/', component: ChooseGroup, props: true},
    {  path: '/:specialty/:group/', component: ChooseMagazines, props: true},
    {  path: '/:specialty/:group/:magazines', component: ChooseAcademicAttendance, props: true}
  ]
})

Vue.config.productionTip = false
Vue.use(VueRouter, VueAxios, axios)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
