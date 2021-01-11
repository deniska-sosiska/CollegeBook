import { getSpecialty, getSpecialties } from "../../services/specialty.service"

const mutations = {
  updateSpecialty(state, data) {
    state.specialty = data
  },
  updateSpecialties(state, data) {
    state.specialties = data
  }
}
const actions = {
  async fetchSpecialty({commit, dispatch}, id) { // 
    try {
      const res = await getSpecialty(id)
      commit('updateSpecialty', res.data)
      dispatch('fetchGroups', res.data.groups)
    }
    catch (error) {
      console.error("Error with API. File: store > specialty:fetchSpesialty\n" ,error)
    }
  },
  async fetchSpecialties({commit}) {
    try {
      const res = await getSpecialties()
      commit('updateSpecialties', res.data)
    }
    catch (error) {
      console.error("Error with API. File: store > specialty:fetchSpesialties\n" ,error)
    }
  }
}
const getters = {
  currentSpecialty: ({specialty}) => specialty,
  allSpecialties: ({specialties}) => specialties
}

const state = () => ({
  specialty: {},
  specialties: []
})

export default {
  state,
  mutations,
  actions,
  getters
}


// function getNowDate() {  
//   let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
//   return data
// }