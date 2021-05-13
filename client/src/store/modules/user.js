import axiosApiInstance from "/services/axiosApiInstance"

const mutations = {
  setAccountData(state, payload) {
    state.accountData = payload
    console.log(state.accountData)
    localStorage.setItem("accountData", JSON.stringify(payload))
  },
  clearAccountData(state) {
    state.accountData = null
    localStorage.removeItem("accountData")
  }
}
const actions = {
  async getAccountData({ commit }, payload) {
    const res = await axiosApiInstance({
      url: `user/authentication`,
      data: payload,
      method: 'post'
    })
    
    commit('setAccountData', res)
  }
}

const getters = {
  accountData: ({ accountData }) => accountData
}

const state = () => ({
  accountData: null
})

export default {
  state,
  mutations,
  actions,
  getters
}
