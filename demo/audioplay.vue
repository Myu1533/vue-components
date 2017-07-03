<template>
  <audioplay :url="url" @closeAudio="handle" v-if="show"></audioplay>
</template>
<script>
	export default {
		name: 'MYaudioplay',
    data(){
			return {
				url:'http://jy-pre.gznb.com/schcommonweb/weedfs/rdownload/3@03162f2e719dae',
        show: true
      }
    },
    methods: {
      handle(){
      	this.show = false
      }
    }
	}
</script>
<style>

</style>
