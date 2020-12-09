import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

function getNowDate() {  
  let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  return data
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    dataOfGroups: {},
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
    setDataOfGroups(state, dataOfGroups) {
      state.dataOfGroups = dataOfGroups
    },
    setDataOfCurrentGroup(state, dataOfCurrentGroup) {//
      state.dataOfStud = dataOfCurrentGroup
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
    // updateDataOfCurrentGroup(ctx, box) {
    //   axios.get(ctx.state.dbGroupsUrl + '/' + box.specialty).then(response => {
    //     response.data.groups.forEach(elem => {
    //       if (elem.id == box.group)
    //         ctx.commit('setDataOfCurrentGroup', elem)
    //     })
    //   })
    // },
    updateDataOfCurrentGroup(ctx, box) {
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
    changeAttandance(ctx, box) {
      let currentStud = ctx.state.dataOfStud[box.indexStud]
      currentStud.attandance[getNowDate()][box.indexPara] = !currentStud.attandance[getNowDate()][box.indexPara]
      console.log(currentStud)
      axios.put(ctx.state.dbStudents + `/${currentStud.id}`, currentStud)
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
    },
    getDataOfStud(state) {
      return state.dataOfStud
    }
  }
})