<template>
  <div>
    asdasd
    <audioPlay :url="url" @closeAudio="handle" v-if="show"></audioPlay>
  </div>
</template>
<script>
  import audioPlay from '../components/vue2audio/src/audio.vue'
  export default {
    name: 'MYaudioplay',
    data () {
      return {
        url: 'http://jy-pre.gznb.com/schcommonweb/weedfs/rdownload/3@03162f2e719dae',
        show: true
      }
    },
    methods: {
      handle () {
        this.show = false
      }
    },
    components: {
      audioPlay
    }
  }
</script>
<style>

</style>
