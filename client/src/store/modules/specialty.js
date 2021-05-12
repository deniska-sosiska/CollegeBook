import axiosApiInstanse from '../../services/axiosApiInstance'

const mutations = {
  setNameCurrentSpecialty(state, name) {
    state.nameCurrentSpecialty = name
  },

  setGroupsByCurrentSpecialty(state, payload) {
    state.groupsByCurrentSpecialty = payload
  },
  setAllSpecialties(state, payload) {
    state.allSpecialties = payload
  },

  switchLoader(state, name) {
    if (name === 'loaderSpecialties') 
      state.loaderSpecialties = !state.loaderSpecialties
    else if (name === 'loaderGroups') 
      state.loaderGroups = !state.loaderGroups
  }
}

const actions = {
  async fetchAllSpecialties({ commit }) {
    commit('switchLoader', 'loaderSpecialties')
    const res = await axiosApiInstanse({
      url: 'specialty'
    })

    commit('setAllSpecialties', res)
    commit('switchLoader', 'loaderSpecialties')
  },


  async fetchGroupsBySpecialtyID({ commit }, specialtyID) {
    commit('switchLoader', 'loaderGroups')

    try {
      const res = await axiosApiInstanse({
        url: `group/specialtyID/${specialtyID}`
      })
      
      commit("setNameCurrentSpecialty", res.nameSpecialty)
      commit("setGroupsByCurrentSpecialty", res.groups)
    } catch(err) {
      commit("setNameCurrentSpecialty", "Ця спецiальнiсть зараз закрита для перегляду")
      throw err
    } finally {
      commit('switchLoader', 'loaderGroups')
    }
  }

}
const getters = {
  groupsByCurrentSpecialty: ({ groupsByCurrentSpecialty }) => groupsByCurrentSpecialty,
  allSpecialties: ({ allSpecialties }) => allSpecialties,
  nameCurrentSpecialty: ({ nameCurrentSpecialty }) => nameCurrentSpecialty,

  loaderSpecialties: ({ loaderSpecialties }) => loaderSpecialties,
  loaderGroups: ({ loaderGroups }) => loaderGroups

}

const state = () => ({
  loaderSpecialties: false,
  loaderGroups: false,

  nameCurrentSpecialty: '',
  groupsByCurrentSpecialty: [],
  allSpecialties: []
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