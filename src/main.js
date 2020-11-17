import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import vContent from './components/V-body-content.vue'
import vChooseGrop from './components/V-body-choose-group.vue'


const routes = [
  {  path: '/', component: vChooseGrop },
  {  path: '/chooseGroup/', component: vChooseGrop, props: true }
]

const router  = new VueRouter({
  routes: routes
})


Vue.config.productionTip = false
Vue.use(VueRouter, VueAxios, axios)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
