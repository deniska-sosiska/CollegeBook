import { getGroup, getFewGroups, getGroups } from "../../services/specialty.service"

const mutations = {
  updateGroup(state, data) {
    state.group = data
  },
  updateGroups(state, data) {
    state.groups = data
  }
}
const actions = {
  async fetchGroup({commit}, id) {
    try {
      const res = await getGroup(id) 
      commit('updateGroup', res.data)
    }
    catch (error) {
      console.error("Error with API. File: store > group:fetchGroup\n" ,error)
    }
  },
  async fetchFewGroup({commit}, body) {
    const res = await getFewGroups(body)
    console.log(res)
  },
  async fetchGroups({commit}) {
    try {
      const res = await getGroups() 
      commit('updateGroups', res.data)
    }
    catch (error) {
      console.error("Error with API. File: store > group:fetchGroups\n" ,error)
    }
  }
}

const getters = {
  group: ({group}) => group,
  groups: ({groups}) => groups
}

const state = () => ({
  group: {},
  groups: []
})

export default {
  state,
  mutations,
  actions,
  getters
}

