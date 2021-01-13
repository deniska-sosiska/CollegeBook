import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import Preloader from './components/Preloader.vue'
import { EllipsisLoader } from "vue-spinners-css";

import store from './store'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter, VueAxios, axios)
Vue.component('Preloader', Preloader)
Vue.component('EllipsisLoader', EllipsisLoader)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
