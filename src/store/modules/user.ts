const state = { userInfo: {} }

const getters = {
  userInfo: (state: object | any) => state.userInfo,
}

const mutations = {
  setUserInfo(state: object | any, info: object) {
    state.userInfo = info
  },
}

const actions = {}

const modules = {}

export default {
  state,
  getters,
  mutations,
  actions,
  modules,
}
