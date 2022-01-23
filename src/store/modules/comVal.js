const state = {
  name: 'czy'
}

const actions = {
  saveCommonValue({
    commit
  }, value) {
    commit('SAVE_COMMON_VALUE', value)
  }
}

const mutations = {
  SAVE_COMMON_VALUE(state, obj) {
    state[obj.key] = obj.value
    // state.data = data;
  }
}

const getters = {
  nameGetter(state, getters, rootState, rootGetters) {
    return state.name + '...'
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
