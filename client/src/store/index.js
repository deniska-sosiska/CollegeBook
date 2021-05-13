import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

  // ↓↓↓ Потрібно розбити на модулі ↓↓↓
  export default new Vuex.Store({
  modules: {
    specialty: modules.specialty,
    user: modules.user
  },
})