import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    dataOfGroups: {},
    dataOfCurrentGroup: {},
    currentUser: null,
    dbGroupsUrl: 'http://127.0.0.1:3000/dataOfGroups', // База даних усіх груп
    dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser' // База даних авторизованних користувачів
  },
  mutations: {
    setDataOfGroups(state, dataOfGroups) {
      state.dataOfGroups = dataOfGroups
    },
    setDataOfCurrentGroup(state, dataOfCurrentGroup) {
      state.dataOfCurrentGroup = dataOfCurrentGroup
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        login: currentUser.login,
        password: currentUser.password
      }
    },
    clearCurrentUser(state) {
      state.currentUser = null
    }
  },
  actions: {
    updateDataOfGroups(ctx) {
      axios.get(ctx.state.dbGroupsUrl).then(response => {
        ctx.commit('setDataOfGroups', response.data)
      })
    },
    updateDataOfCurrentGroup(ctx, specialty) {
      axios.get(ctx.state.dbGroupsUrl + '/' + specialty).then(response => {
        ctx.commit('setDataOfCurrentGroup', response.data)
      })
    }
  },
  getters: {
    getDataOfGroups(state) {
      return state.dataOfGroups
    },
    getDataOfCurrentGroup(state) {
      return state.dataOfCurrentGroup
    },
    getUser(state) {
      return state.currentUser
    }
  }
})