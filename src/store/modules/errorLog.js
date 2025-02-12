const state = {
  logs: [],
}

const getters = {
  errorLogs: (state) => state.logs,
}

const actions = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  },
}

const mutations = {
  ADD_ERROR_LOG(state, log) {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG(state) {
    state.logs = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
