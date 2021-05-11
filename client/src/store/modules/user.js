import { getUsers, setNewUser } from "../../services/user.service"
import axiosApiInstance from "/services/axiosApiInstance"

const mutations = {
  setAccountData(state, payload) {
    state.accountData = payload
  },
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
  async getAccountData({ commit }, payload) {
    const res = await axiosApiInstance({
      url: `authentication`,
      data: payload,
      method: 'post'
    })

    commit('setAccountData', res)
  },



  //
  async setNewRegisteredUser({commit}, data) {
    try {
      let res = await setNewUser(data)
    }
    catch (error) {
      console.error("Error with API. File: store > user:setNewRegisteredUser\n" ,error)
    }
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
