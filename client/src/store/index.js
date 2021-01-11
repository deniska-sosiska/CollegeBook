import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import modules from './modules'

Vue.use(Vuex)

function getNowDate() {  
  let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  return data
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    specialty: modules.specialty,
    group: modules.group
  },
  // ↓↓↓ Потрібно розбити на модулі ↓↓↓
  state: {
    dataOfSpecialty: {},
    dataOfCurrentGroup: {},
    dataOfCurrentSpecialty: {},
    dataOfRegisteredUser: {},
    dataOfStud: {}, //
    currentUser: null,
    dbGroupsUrl: 'http://127.0.0.1:3000/dataOfGroups', // База даних усіх груп
    dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser', // База даних авторизованних користувачів
    dbStudents: 'http://localhost:3000/students/' //  База даних авторизованних students
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        login: currentUser.login,
        password: currentUser.password,
        role: currentUser.role
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
    updateDataOfSpecialty(ctx) { //оновлює дані по спеціальності '/#/'
      axios.get(ctx.state.dbGroupsUrl).then(response => {
        ctx.commit('setDataOfSpecialty', response.data)
      })
    },
    updateDataOfCurrentGroup(ctx, box) { //оновлює дані поточної групи
      let arrayStud = []
      axios.get(ctx.state.dbStudents).then(response => {
        response.data.forEach(elem => {
          if (elem.specialty == box.specialty && elem.group == box.group) 
            arrayStud.push(elem)
        })
        ctx.commit('setDataOfCurrentGroup', arrayStud)

      })
    },
    updateStud(ctx, data) {
      let currentStud =  ctx.state.dataOfStud[data.indexStud]
      let newData = currentStud.attandance
      newData[getNowDate()] = (data.info)
      currentStud.attandance = newData
      axios.put(ctx.state.dbStudents + `/${currentStud.id}`, currentStud)
    },
    changeAttandance(ctx, dataOfStud) {
      dataOfStud.forEach(elem => {
        axios.put(ctx.state.dbStudents + `/${elem.id}`, elem)
      })
    },
    updateDataOfCurrentSpecialty(ctx, specialty) { //оновлює дані по обраній спеціальності '/RPZ/'
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
      })
    }
  },
  getters: {
    getDataOfSpecialty: ({dataOfSpecialty}) => dataOfSpecialty,
    getDataOfCurrentGroup: ({dataOfCurrentGroup}) => dataOfCurrentGroup,
    getDataOfCurrentSpecialty: ({dataOfCurrentSpecialty}) => dataOfCurrentSpecialty,
    getUser: ({currentUser}) => currentUser,
    getRegisteredUser: ({dataOfRegisteredUser}) => dataOfRegisteredUser,
    getDataOfStud: ({dataOfStud}) => dataOfStud
  }
})