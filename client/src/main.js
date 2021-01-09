import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import store from './store'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter, VueAxios, axios)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
