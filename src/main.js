import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import Unicon from 'vue-unicons'
import { uniAngleDown, uniMeh } from 'vue-unicons/src/icons'

Vue.config.productionTip = false

Unicon.add([uniAngleDown, uniMeh])
Vue.use(Unicon)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
