const state = { packageList: {} }

const getters = {
  packageList: (state: object | any) => state.packageList,
}

const mutations = {
  setPackageList(state: object | any, packages: Array<object>) {
    state.packageList = packages
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
