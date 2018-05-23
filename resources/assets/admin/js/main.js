import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
// global.jQuery = $;
// const bootstrap = require('bootstrap');
import iView from 'iview'
Vue.use(iView)

import axios from 'axios'
import VueAxios from 'vue-axios'//实现axios全局引入
Vue.use(VueAxios,axios)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
