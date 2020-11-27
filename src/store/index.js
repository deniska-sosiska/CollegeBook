import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataOfGroups: {},
    dbGroupsUrl: 'http://127.0.0.1:3000/dataOfGroups',
    dbAuthorizUrl: 'http://127.0.0.1:3000/registeredUser'
  },
  mutations: {
    changeDataOfGroups(state, dataOfGroups) {
      state.dataOfGroups = dataOfGroups
    }
  },
  actions: {
    updateDataOfGroups(ctx, state) {
      axios.get(ctx.state.dbGroupsUrl).then(response => {
        ctx.commit('changeDataOfGroups', response.data)
      })
    }
  },
  getters: {
    getDataOfGroups(state) {
      return state.dataOfGroups
    }
  }
})