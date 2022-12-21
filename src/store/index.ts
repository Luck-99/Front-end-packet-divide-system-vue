import Vue from "vue"
import Vuex from "vuex"

import taskSettingStore from "./modules/taskSettingStore"
import userStore from "./modules/user"

Vue.use(Vuex)

const state = {}

const getters = {}

const mutations = {}

const actions = {}

const modules = { taskSettingStore, userStore }

export default new Vuex.Store({ state, getters, mutations, actions, modules })
