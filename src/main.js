import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import Unicon from 'vue-unicons'
import { uniAngleDown, uniMeh } from 'vue-unicons/src/icons'

Vue.config.productionTip = false

Unicon.add([uniAngleDown, uniMeh])
Vue.use(Unicon)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
