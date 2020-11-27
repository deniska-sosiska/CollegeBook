import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataOfGroups: {},
    dataOfCurrentGroup: {},
    dbGroupsUrl: 'http://127.0.0.1:3000/dataOfGroups',
    dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser'
  },
  mutations: {
    changeDataOfGroups(state, dataOfGroups) {
      state.dataOfGroups = dataOfGroups
    },
    changeDataOfCurrentGroup(state, dataOfCurrentGroup) {
      state.dataOfCurrentGroup = dataOfCurrentGroup
    }
  },
  actions: {
    updateDataOfGroups(ctx) {
      axios.get(ctx.state.dbGroupsUrl).then(response => {
        ctx.commit('changeDataOfGroups', response.data)
      })
    },
    updateDataOfCurrentGroup(ctx, specialty) {
      axios.get(ctx.state.dbGroupsUrl + '/' + specialty).then(response => {
        ctx.commit('changeDataOfCurrentGroup', response.data)
      })
    }
  },
  getters: {
    getDataOfGroups(state) {
      return state.dataOfGroups
    },
    getDataOfCurrentGroup(state) {
      return state.dataOfCurrentGroup
    }
  }
})