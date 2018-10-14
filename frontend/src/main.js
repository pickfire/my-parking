import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en'
import Axios from 'axios'

import ParkingMap from './components/ParkingMap'
import SearchDestination from './components/SearchDestination'
import NearestParking from './components/NearestParking'


const routes = [
  { path: '/carpark', component: ParkingMap },
  { path: '/search', component: SearchDestination },
  { path: '/nearest', component: NearestParking }
]

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

Vue.prototype.$http = Axios

const router = new VueRouter({ routes })
new Vue({ router, render: h => h(App) }).$mount('#app')

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
