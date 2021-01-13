import { getUsers } from "../../services/user.service"

const mutations = {

  setCurrentUser(state, currentUser) {
    state.currentUser = {
      login: currentUser.login,
      password: currentUser.password,
      role: currentUser.role
    }
  },
  clearCurrentUser(state) {
    state.currentUser = null
  }
}
const actions = {
  async fetchCurrentUser({commit}, existingUser) {
    let responseToComponent = false
    let res = await getUsers()
    
    res.data.forEach(element => {
      if ((existingUser.userLogin == element.login) && (existingUser.userPassword == element.password)) {
        commit('setCurrentUser', {
          login: element.login,
          password: element.password,
          role: element.role
        })
        responseToComponent = true
      }
    })
    return responseToComponent
  }
}

const getters = {
  getUser: ({currentUser}) => currentUser,
}

const state = () => ({
  currentUser: null
})

export default {
  state,
  mutations,
  actions,
  getters
}
