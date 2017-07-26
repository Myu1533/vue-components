// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import upload from './components/vue_axios_drag_upload/'
import audio from './components/vue2audio/'
import ImgClip from './components/vue2ImgClip/'

Vue.use(VueAxios, axios)
Vue.use(upload)
Vue.use(audio)
Vue.use(ImgClip)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
