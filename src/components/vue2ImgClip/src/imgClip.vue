<template>
  <div class="imgCrop" ref="imgCrop">
    <canvas id="resultClip" ref="c2" width="300" height="300">crop</canvas>
    <div class="imgCropBox">
      <img :src="imgURL" ref="cropImg" style="transform: translate(0,0) scale(1)">
      <canvas ref="cropBox"></canvas>
    </div>

    <div class="imgCrop-btns">
      <div class="imgCrop-btn minus" @click="handleMinus"><img src="./img/minus.svg" alt="minus"></div>
      <div class="imgCrop-progress outer">
        <div class="imgCrop-progress inner" style="width: 50%;" ref="progress">

        </div>
        <div class="imgCrop-progress-pointer" style="left: 49.6%;" ref="pointer"></div>
      </div>
      <div class="imgCrop-btn plus" @click="handlePlus"><img src="./img/plus.svg" alt="plus"></div>
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
    data () {
      return {
        cropBox: null,
        ctx: null
      }
    },
    mounted () {
      this.initImgClip()
    },
    methods: {
      initImgClip () {
        let _this = this
        _this.cropBox = _this.$refs.cropBox
        _this.ctx = _this.cropBox.getContext('2d')
        _this.cropBox.width = 600
        _this.cropBox.height = 400
        _this.drawClip()
        _this.moveCropImg()
        _this.progressDrag()
      },
      moveCropImg () {
        let _this = this
        let cBox = _this.$refs.cropBox
        let cImg = _this.$refs.cropImg
        let mouseEvent = {
          startX: 0,
          startY: 0,
          lastX: 0,
          lastY: 0
        }
        cBox.addEventListener('mousedown', function (e) {
          e.preventDefault()
          mouseEvent.startX = mouseEvent.lastX = e.offsetX
          mouseEvent.startY = mouseEvent.lastY = e.offsetY
          cBox.addEventListener('mousemove', handleMouseMove)
        })
        cBox.addEventListener('mouseup', function (e) {
          e.preventDefault()
          cBox.removeEventListener('mousemove', handleMouseMove)
        })
        function handleMouseMove (e) {
          e.preventDefault()
          let tmp = cImg.style.transform.split('scale')
          let cX = parseInt(cImg.style.transform.split('px,')[0].split('translate(')[1])
          let cY = parseInt(cImg.style.transform.split('px,')[1].split('px)')[0])
          let delX = e.offsetX - mouseEvent.lastX
          let delY = e.offsetY - mouseEvent.lastY
          delX > 0 ? cX = cX + Math.abs(delX) : cX = cX - Math.abs(delX)
          delY > 0 ? cY = cY + Math.abs(delY) : cY = cY - Math.abs(delY)
          cImg.style.transform = 'translate(' + cX + 'px,' + cY + 'px)' + 'scale' + tmp[1]
          mouseEvent.lastX = e.offsetX
          mouseEvent.lastY = e.offsetY
          if (e.offsetX > e.target.offsetWidth * 0.95 || e.offsetX < 5 || e.offsetY > e.target.offsetHeight * 0.95 || e.offsetY < 5) {
            cBox.removeEventListener('mousemove', handleMouseMove)
          }
        }
      },
      drawClip () {
        let _this = this
        let cropBox = _this.cropBox
        let ctx = _this.ctx
        let w = cropBox.width
        let h = cropBox.height
        let cw = 360
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.globalAlpha = 0.6
        ctx.fillRect(0, 0, cropBox.width, cropBox.height)// 设置canvas的长宽
        ctx.restore()
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'// 设置裁剪模式
        ctx.beginPath()
        ctx.arc(w / 2, h / 2, cw / 2, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.restore()
      },
      progressDrag () {
        let _this = this
        let pointer = _this.$refs.pointer
        let progress = _this.$refs.progress
        let cImg = _this.$refs.cropImg
        let startX = 0
        pointer.addEventListener('mousedown', function (e) {
          e.preventDefault()
          if (startX === 0) {
            startX = Math.abs(e.pageX - e.target.offsetLeft)
          }
          pointer.addEventListener('mousemove', handlePointer)
        })
        pointer.addEventListener('mouseup', function (e) {
          e.preventDefault()
          pointer.removeEventListener('mousemove', handlePointer)
        })
        pointer.addEventListener('mouseleave', function (e) {
          e.preventDefault()
          pointer.removeEventListener('mousemove', handlePointer)
        })
        function handlePointer (e) {
          e.preventDefault()
          let tmp = cImg.style.transform.split('scale')
          let r = 1
          if (e.target.offsetLeft < 0) {
            pointer.style.left = '0.018%'
            r = 0.5
          } else if (e.target.offsetLeft > 500) {
            pointer.style.left = '96.4%'
            progress.style.width = '100%'
            r = 1.5
          } else {
            pointer.style.left = e.pageX - startX + 'px'
            progress.style.width = pointer.offsetLeft / 500 * 100 + '%'
            r = 0.5 + (progress.offsetWidth / 250) * 0.5
          }
          cImg.style.transform = tmp[0] +
            'scale(' +
            r +
            ')'
        }
      },
      handleMinus () {
        let _this = this
        let pointer = _this.$refs.pointer
        let progress = _this.$refs.progress
        let cImg = _this.$refs.cropImg
        let rate = progress.offsetWidth / 250 // 比率
        let r = 1
        let del = 9 / 500
        let tmp = cImg.style.transform.split('scale')
        if (rate < 0.05) {
          pointer.style.left = del + '%'
          progress.style.width = 0 + '%'
          r = 0.5
        } else if (rate > 2) {
          r = 1.5
        } else {
          pointer.style.left = (rate - del) * 50 + '%'
          progress.style.width = (rate - del) * 50 + '%'
          r = 0.5 + 0.5 * rate
        }

        cImg.style.transform = tmp[0] +
          'scale(' +
          r +
          ')'
      },
      handlePlus () {
        let _this = this
        let pointer = _this.$refs.pointer
        let progress = _this.$refs.progress
        let cImg = _this.$refs.cropImg
        let rate = progress.offsetWidth / 250 // 比率
        let tmp = cImg.style.transform.split('scale')
        let del = 9 / 500
        let r = 1

        if (rate > 1.95) {
          pointer.style.left = 96.4 + '%'
          progress.style.width = 100 + '%'
          r = 1.5
        } else {
          pointer.style.left = (rate + del) * 50 + '%'
          progress.style.width = (rate + del) * 50 + '%'
          r = 0.5 + 0.5 * rate
        }
        cImg.style.transform = tmp[0] +
          'scale(' +
          r +
          ')'
      },
      clip () {
        let _this = this
        let cImg = _this.$refs.cropImg
        let cvs = _this.$refs.cropBox
        let tmp = cImg.style.transform.split('scale')[1].split('(')[1].split(')')[0]
        let c2 = _this.$refs.c2
        let ctx = c2.getContext('2d')
        ctx.drawImage(cImg, cImg.getBoundingClientRect().left - cvs.getBoundingClientRect().left - 180, cImg.getBoundingClientRect().top - cvs.getBoundingClientRect().top - 20, cImg.width * tmp, cImg.height * tmp)
        let data = c2.toDataURL()
        data = data.split(',')[1]
        data = window.atob(data)
        let ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i)
        }
        let blob = new Blob([ia], {type: 'image/png'})
        _this.$emit('cripURL', {blob: blob, base64: c2.toDataURL()})
      },
      close () {
        this.$emit('closeClip')
      }
    }
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
    position: absolute;
    width: 36px;
    height: 36px;
    font-size: 30px;
    font-weight: 300;
    border-radius: 4px;
    border: 1px solid #E1E6EB;
    color: #5F6369;
    text-align: center;
    cursor: pointer;
  }

  .minus {
    top: 0;
    left: 0;
    line-height: 22px;
  }

  .plus {
    top: 0;
    right: 0;
    line-height: 32px;
  }

  .imgCrop-progress {
    position: relative;
    display: inline-block;
    width: 500px;
    height: 6px;
    background-color: #F1F6FA;
    border-radius: 2px;
    margin: -9px 6px;
  }

  .imgCrop-progress .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    margin: 0;
    background-color: #20A0FF;
  }

  .imgCrop-progress-pointer {
    position: absolute;
    top: -8px;
    left: -0.018%;
    width: 18px;
    height: 18px;
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
