import axios from 'axios'

function getNowDate() {  
  let data = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  return data
}

export default {
  state: () => ({
    specialties: [],
    urlSpecialty: 'http://localhost:3000/api/specialty'
  }),
  mutations: {
    updateSpecialties(state, data) {
      state.specialties = data
    }
  },
  actions: {
    fetchSpesialties({state, commit}) {
      axios.get(state.urlSpecialty).then(res => {
        commit('updateSpecialties', res.data)
      })
    }
  },
  getters: {
    getSpecialties: ({specialties}) => specialties 
  }
}