import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import modules from './modules'

Vue.use(Vuex)

// function getNowDate() {  
//   let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
//   return data
// }

// const userData = createPersistedState({
  // paths: ['data']
// })

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    specialty: modules.specialty,
    group: modules.group,
    preloader: modules.preloader,
    user: modules.user
  },
  // ↓↓↓ Потрібно розбити на модулі ↓↓↓
  // state: {
  //   dataOfSpecialty: {},
  //   dataOfCurrentGroup: {},
  //   dataOfCurrentSpecialty: {},
  //   dataOfRegisteredUser: {},
  //   dataOfStud: {}, //
  //   currentUser: null,
  //   dbGroupsUrl: 'http://127.0.0.1:3000/dataOfGroups', // База даних усіх груп
  //   dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser', // База даних авторизованних користувачів
  //   dbStudents: 'http://localhost:3000/students/' //  База даних авторизованних students
  // },
  // mutations: {},
  // actions: {
  //   updateStud(ctx, data) {
  //     let currentStud =  ctx.state.dataOfStud[data.indexStud]
  //     let newData = currentStud.attandance
  //     newData[getNowDate()] = (data.info)
  //     currentStud.attandance = newData
  //     axios.put(ctx.state.dbStudents + `/${currentStud.id}`, currentStud)
  //   },
  //   changeAttandance(ctx, dataOfStud) {
  //     dataOfStud.forEach(elem => {
  //       axios.put(ctx.state.dbStudents + `/${elem.id}`, elem)
  //     })
  //   }
  // },
  // getters: {
  //   getDataOfStud: ({dataOfStud}) => dataOfStud
  // }
})