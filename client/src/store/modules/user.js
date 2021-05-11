import { getUsers, setNewUser } from "../../services/user.service"
// import axiosApiInstance from "/services/axiosApiInstance"

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
  // async getAccountData() {
  //   const res = await axiosApiInstance({
  //     url: `user`,
  //     method: 'post'
  //   })
  // },



  //
  async setNewRegisteredUser({commit}, data) {
    try {
      let res = await setNewUser(data)
    }
    catch (error) {
      console.error("Error with API. File: store > user:setNewRegisteredUser\n" ,error)
    }
  },
  async fetchCurrentUser({commit}, existingUser) {
    let responseToComponent = false
    let res = await getUsers()

    // console.log(res.data)
    
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
  accountData: ({ accountData }) => accountData,
  getUser: ({ currentUser }) => currentUser,
}

const state = () => ({
  accountData: null,
  currentUser: null
})

export default {
  state,
  mutations,
  actions,
  getters
}
