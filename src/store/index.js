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
    dataOfCurrentSpecialty: {},
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
    setDataOfCurrentSpecialty(state, dataOfCurrentSpecialty) {
      state.dataOfCurrentSpecialty = dataOfCurrentSpecialty
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
    updateDataOfCurrentGroup(ctx, box) {
      axios.get(ctx.state.dbGroupsUrl + '/' + box.specialty).then(response => {
        response.data.groups.forEach(elem => {
          if (elem.id == box.group)
            ctx.commit('setDataOfCurrentGroup', elem)
        })
      })
    },
    updateDataOfCurrentSpecialty(ctx, specialty) {
      axios.get(ctx.state.dbGroupsUrl + '/' + specialty).then(response => {
        ctx.commit('setDataOfCurrentSpecialty', response.data)
      })
    },
    setAllRegisteredUser(ctx) {
      axios.get(ctx.state.dbAuthorizUrl).then((response) => {
        ctx.commit('setAllRegisteredUser', response.data)
      })
    },
    setNewRegisteredUser(ctx, newUser) {
      axios.post(ctx.state.dbAuthorizUrl, newUser).then((response) => {
        console.log(response.data)
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
    getDataOfCurrentSpecialty(state) {
      return state.dataOfCurrentSpecialty
    },
    getUser(state) {
      return state.currentUser
    },
    getRegisteredUser(state) {
      return state.dataOfRegisteredUser
    }
  }
})