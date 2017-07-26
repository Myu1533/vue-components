import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import dragUpload from '../demo/dragUpload.vue'
import audioplay from '../demo/audioplay.vue'
import dImgClip from '../demo/imgClip.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dragUpload',
      name: dragUpload,
      component: dragUpload
    },
    {
      path: '/audio',
      name: audioplay,
      component: audioplay
    },
    {
      path: '/imgClip',
      name: dImgClip,
      component: dImgClip
    }
  ]
})
