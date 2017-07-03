<template>
  <imgCrop style="margin: 0 auto;" :imgURL="url"></imgCrop>
</template>
<script>
  import i from './107.jpg'
	export default {
		name: 'dImgClip',
    data(){
			return {
        url: i
      }
    }
	}
</script>
<style>

</style>
