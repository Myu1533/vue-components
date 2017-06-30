<template>
  <div class="imgClip" ref="imgClip">
    <img :src="imgURL" alt="">
    <div class="clipBox"></div>
  </div>
</template>
<script>
  export default {
    name: 'imgClip',
    props: {
      imgURL: {
        type: String
      }
    },
    data(){
      return {
        cvs: null,
        ctx: null
      }
    },
    mounted(){
    },
    methods: {
      init(){
        let _this = this;
        _this.cvs = _this.$refs.cvs;
        _this.ctx = _this.cvs.getContext('2d');

        _this.cvs.width = _this.$refs.imgClip.offsetWidth;
        _this.cvs.height = _this.$refs.imgClip.offsetHeight;

        _this.drawClip();

      },
      drawClip(){
        let _this = this;
        let cvs = _this.cvs;
        let ctx = _this.ctx;
        ctx.arc(cvs.width - 180 - 120, cvs.height - 200, 180, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        ctx.clip();
      }
    }
  }
</script>
<style scoped>
  .imgClip {
    position: relative;
    width: 600px;
    height: 400px;
    overflow: hidden;
  }

  .clipBox {
    position: absolute;
    top: 0;
    left: 0;

  }
</style>
