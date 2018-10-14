import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en'
import './css/global.css'
import 'leaflet/dist/leaflet.css'

import ParkingMap from './components/ParkingMap'
import SearchDestination from './components/SearchDestination'
import Duration from './components/Duration'


const routes = [
  { path: '/', component: SearchDestination },
  { path: '/carpark', component: ParkingMap },
  { path: '/search', component: SearchDestination },
  { path: '/duration', component: Duration }
]

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

const router = new VueRouter({ routes })
new Vue({ router, render: h => h(App) }).$mount('#app')

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
