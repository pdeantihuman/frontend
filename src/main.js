import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import iView from 'iview'
Vue.use(iView)
window.axios = require('axios')

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
