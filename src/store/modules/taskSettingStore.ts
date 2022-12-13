const state = { packageList: {}, envInfo: {} }

const getters = {
  packageList: (state: object | any) => state.packageList,
  envInfo: (state: object | any) => state.envInfo,
}

const mutations = {
  setPackageList(state: object | any, packages: Array<object>) {
    state.packageList = packages
  },
  setEnvInfo(state: object | any, envInfo: Array<object>) {
    state.envInfo = envInfo
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
