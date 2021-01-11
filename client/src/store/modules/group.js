import { getGroup, getGroups } from "../../services/group.service"

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
  async fetchGroups({commit}, body) { 
    try {
      const res = await getGroups(body)
      commit('updateGroups', res)
    }
    catch (error) {
      console.warn("Error with API. File: store > group:fetchGroups\n" ,error)
    }
  }
}

const getters = {
  currentGroup: ({group}) => group,
  allGroups: ({groups}) => groups
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

