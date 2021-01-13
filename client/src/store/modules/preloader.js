const mutations = {
  updatePreloaderMain(state, data) {
    state.preloaderMain = data
  }
}
const actions = {}

const getters = {
  currentPreloaderMain: ({preloaderMain}) => preloaderMain 
}

const state = () => ({
  preloaderMain: true
})

export default {
  state,
  mutations,
  actions,
  getters
}
