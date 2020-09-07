import 'milligram/dist/milligram.min.css'

import App from './App.vue'
import { Plugin } from 'vue-fragment'
import Vue from 'vue'
import router from './router'
import store from './store'

Vue.use(Plugin)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
