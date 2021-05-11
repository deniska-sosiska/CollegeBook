import Vue from 'vue'

import store from './store'
import router from './router'
import App from './App.vue'

import Preloader from './components/Preloader.vue'
Vue.component('Preloader', Preloader)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
