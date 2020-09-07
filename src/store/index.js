import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import sidebar from './modules/sidebar'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const persist = true

const vuexPersist = new VuexPersistence({
  strictMode: debug,
  storage: localStorage,
})

export default new Vuex.Store({
  strict: debug,
  modules: {
    sidebar,
  },
  mutations: {
    ...(debug &&
      persist && {
        RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
      }),
  },
  plugins: [persist && vuexPersist.plugin].filter(Boolean),
})
