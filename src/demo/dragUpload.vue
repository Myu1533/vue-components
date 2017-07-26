<template>
  <MYupload :maxList="maxList" :checkType="checkType" :fileSizeLimit="fileSizeLimit"></MYupload>
</template>
<script>
  export default {
    name: 'dragUpload',
    data () {
      return {
        maxList: 3,
        checkType: 'audio',
        fileSizeLimit: 3
      }
    }
  }
</script>
<style>

</style>
