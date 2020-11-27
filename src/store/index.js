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
    dataOfRegisteredUser: {},
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
    setAllRegisteredUser(state, allRegisteredUser) {
      state.dataOfRegisteredUser = allRegisteredUser
    },
    clearCurrentUser(state) {
      state.currentUser.login = state.currentUser.password = state.currentUser = null
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
    },
    setAllRegisteredUser(ctx) {
      axios.get(ctx.state.dbAuthorizUrl).then((response) => {
        ctx.commit('setAllRegisteredUser', response.data)
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
    },
    getRegisteredUser(state) {
      return state.dataOfRegisteredUser
    }
  }
})