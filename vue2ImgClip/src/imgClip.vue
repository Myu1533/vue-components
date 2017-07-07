<template>
  <div class="imgCrop" ref="imgCrop">
    <canvas id="resultClip" ref="c2" width="300" height="300">crop</canvas>
    <div class="imgCropBox">
      <img :src="imgURL" ref="cropImg" style="transform: translate(0,0) scale(1)">
      <canvas ref="cropBox"></canvas>
    </div>

    <div class="imgCrop-btns">
      <span class="imgCrop-btn minus" @click="handleMinus">-</span>
      <div class="imgCrop-progress outer">
        <div class="imgCrop-progress inner" ref="progress">

        </div>
        <span class="imgCrop-progress-pointer" ref="pointer"></span>
      </div>
      <span class="imgCrop-btn plus" @click="handlePlus">+</span>
      <div class="mgCrop-emit-btns">
        <button @click="clip" class="btn-clip">{{ confirmLabel ? confirmLabel : '确认'}}</button>
        <button @click="close" class="btn-close">{{ closeLabel ? closeLabel : '取消'}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'imgCrop',
    props: {
      imgURL: {
        type: String
      },
      confirmLabel: {
        type: String
      },
      closeLabel: {
        type: String
      }
    },
    data(){
      return {
        cropBox: null,
        ctx: null
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        let _this = this;
        _this.cropBox = _this.$refs.cropBox;
        _this.ctx = _this.cropBox.getContext('2d');

        _this.cropBox.width = 600;
        _this.cropBox.height = 400;

        _this.drawClip();
        _this.moveCropImg();
        _this.progressDrag();
      },
      moveCropImg(){
        let _this = this;
        let cBox = _this.$refs.cropBox;
        let cImg = _this.$refs.cropImg;
        let mouseEvent = {
          startX: 0,
          startY: 0,
          lastX: 0,
          lastY: 0
        };

        cBox.addEventListener('mousedown', function (e) {
          e.preventDefault();
          mouseEvent.startX = mouseEvent.lastX = e.offsetX;
          mouseEvent.startY = mouseEvent.lastX = e.offsetY;
          cBox.addEventListener('mousemove', handleMouseMove);
        });
        cBox.addEventListener('mouseup', function (e) {
          e.preventDefault();
          cBox.removeEventListener('mousemove', handleMouseMove);
        });

        function handleMouseMove(e) {
          e.preventDefault();
          let tmp = cImg.style.transform.split('scale');
          let cX = parseInt(cImg.style.transform.split('px,')[0].split('translate(')[1]);
          let cY = parseInt(cImg.style.transform.split('px,')[1].split('px)')[0]);
          e.offsetX > mouseEvent.lastX ? cX = cX + 1.5 : cX = cX - 1.5;
          e.offsetY > mouseEvent.lastY ? cY = cY + 1.5 : cY = cY - 1.5;
          cImg.style.transform = 'translate(' + cX + 'px,' + cY + 'px)' + 'scale' + tmp[1];
          mouseEvent.lastX = e.offsetX;
          mouseEvent.lastY = e.offsetY;
          if (e.offsetX > e.target.offsetWidth * 0.95 || e.offsetX < 5 || e.offsetY > e.target.offsetHeight * 0.95 || e.offsetY < 5) {
            cBox.removeEventListener('mousemove', handleMouseMove);
          }
        }
      },
      drawClip(){
        let _this = this;
        let cropBox = _this.cropBox;
        let ctx = _this.ctx,
          w = cropBox.width,
          h = cropBox.height,
          cw = 300,
          ch = 280;
        ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.7;
        ctx.fillRect(0, 0, cropBox.width, cropBox.height);// 设置canvas的长宽
        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";// 设置裁剪模式
        ctx.beginPath();//
        ctx.arc(w / 2, h / 2, cw / 2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
      },
      progressDrag(){
        let _this = this;
        let pointer = _this.$refs.pointer;
        let progress = _this.$refs.progress;
        let cImg = _this.$refs.cropImg;
        let startX = 0,
          lastX = 0;
        pointer.addEventListener('mousedown', function (e) {
          e.preventDefault();
          if (startX === 0) {
            startX = Math.abs(e.pageX - e.target.offsetLeft);
          }
          pointer.addEventListener('mousemove', handlePointer);
        });
        pointer.addEventListener('mouseup', function (e) {
          e.preventDefault();
          pointer.removeEventListener('mousemove', handlePointer);
        });
        pointer.addEventListener('mouseleave', function (e) {
          e.preventDefault();
          pointer.removeEventListener('mousemove', handlePointer);
        });
        function handlePointer(e) {
          e.preventDefault();
          if (e.target.offsetLeft < 0) {
            pointer.style.left = 0 + 'px';
          } else if (e.target.offsetLeft > 480) {
            pointer.style.left = 480 + 'px';
          } else {
            let tmp = cImg.style.transform.split('scale');
            pointer.style.left = e.pageX - startX + 'px';
            progress.style.width = pointer.offsetLeft / 500 * 100 + '%';
            cImg.style.transform = tmp[0] + 'scale(' + ( 1 + pointer.offsetLeft / 500 ) + ')';
          }
        }
      },
      handleMinus(){
        let _this = this;
        let pointer = _this.$refs.pointer;
        let progress = _this.$refs.progress;
        let cImg = _this.$refs.cropImg;
        let radio = progress.offsetWidth / 500 * 100;
        if (progress.offsetWidth < 10) {
          radio = 1;
        }
        let tmp = cImg.style.transform.split('scale');
        pointer.style.left = radio - 1 + '%';
        progress.style.width = radio - 1 + '%';
        cImg.style.transform = tmp[0] + 'scale(' + ( 1 + radio / 100 ) + ')';
      },
      handlePlus(){
        let _this = this;
        let pointer = _this.$refs.pointer;
        let progress = _this.$refs.progress;
        let cImg = _this.$refs.cropImg;
        let radio = 10;
        let r = progress.offsetWidth / 500 * 100;
        radio = radio + r;
        if (progress.offsetWidth > 490) {
          radio = 100;
        }
        let tmp = cImg.style.transform.split('scale');
        pointer.style.left = radio - 3.5 + '%';
        progress.style.width = radio + '%';
        cImg.style.transform = tmp[0] + 'scale(' + ( 1 + radio / 100 ) + ')';
      },
      clip(){
        let _this = this;
        let cImg = _this.$refs.cropImg;
        let cvs = _this.$refs.cropBox;
        let tmp = cImg.style.transform.split('scale')[1].split('(')[1].split(')')[0];
        let c2 = _this.$refs.c2;
        let ctx = c2.getContext('2d');
        ctx.drawImage(cImg, cImg.getBoundingClientRect().left - cvs.getBoundingClientRect().left - 150, cImg.getBoundingClientRect().top - cvs.getBoundingClientRect().top - 50, cImg.width * tmp, cImg.height * tmp);

        let data = c2.toDataURL();
        data = data.split(',')[1];
        data = window.atob(data);
        let ia = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i);
        }
        let blob = new Blob([ia], {type: "image/png"});
        _this.$emit('cripURL', {blob: blob, base64: c2.toDataURL()});
      },
      close() {
        this.$emit('closeClip');
      }
    },
  }
</script>
<style scoped>
  .imgCrop {
    position: relative;
    width: 600px;
    min-height: 400px;
  }

  .imgCropBox {
    position: relative;
    width: 600px;
    height: 400px;
    overflow: hidden;
    background-color: #ffffff;
  }

  #resultClip {
    position: absolute;
    top: 0;
    left: 0;
  }

  .imgCropBox canvas {
    position: absolute;
    top: 0;
    left: 0;

  }

  .imgCrop-btns {
    position: relative;
    margin: 10px 0;
  }

  .imgCrop-btn {
    display: inline-block;
    width: 42px;
    height: 42px;
    font-size: 24px;
    line-height: 42px;
    border-radius: 4px;
    border: 1px solid #E1E6EB;
    color: #5F6369;
    text-align: center;
  }

  .imgCrop-progress {
    position: relative;
    display: inline-block;
    width: 500px;
    height: 6px;
    background-color: #F1F6FA;
    border-radius: 2px;
  }

  .imgCrop-progress .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    background-color: #20A0FF;
  }

  .imgCrop-progress-pointer {
    position: absolute;
    top: -8px;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #E1E6EB;
    background-color: #ffffff;
  }

  .mgCrop-emit-btns {
    margin-top: 50px;
    height: 45px;
    line-height: 45px;
    text-align: right;
  }

  .btn-clip {
    width: 93px;
    height: 30px;
    background-color: #20A0FF;
    color: #ffffff;
    border-radius: 3px;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .btn-close {
    width: 73px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #C0CCDA;
    color: #C0CCDA;
    border-radius: 3px;
    cursor: pointer;
  }
</style>
