import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import vChooseGroups from './components/V-body-choose-groups.vue'
import vChooseGroup from './components/V-body-choose-group.vue'
import vChooseMagazines from './components/V-body-choose-magazines.vue'
import vChooseAcademicAttendance from './components/V-body-academic-attendance.vue'


const router  = new VueRouter({
  routes: [
    {  path: '/', component: vChooseGroups },
    {  path: '/:specialty/', component: vChooseGroup, props: true},
    {  path: '/:specialty/:group/', component: vChooseMagazines, props: true},
    {  path: '/:specialty/:group/:magazines', component: vChooseAcademicAttendance, props: true}
  ]
})

Vue.config.productionTip = false
Vue.use(VueRouter, VueAxios, axios)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
