<template>
  <div class="audio">
    <div class="audio-controlls">
      <div class="audio-play-btns">
        <div class="audio-btn pause" @click="audioPlay" v-if="play"></div>
        <div @click="audioPlay" class="audio-btn play" v-else></div>
        <div class="audio-progress outer">
          <div class="audio-progress inner" ref="progress">
            <div class="audio-progress pointer" ref="audio_pointer">
              <div class="inner"></div>
            </div>
          </div>
        </div>
        <div class="audio-btn close" @click="closeAudio"></div>
      </div>
      <div class="audio-controlls-mask" v-if="aLoading"></div>
    </div>
    <div class="audio-hide">
      <audio :src="url" preload controls ref="audio"></audio>
    </div>
  </div>
</template>
<script>
  //  import { audioLoading, aErr, aEnd, aTimeUpdate } from './mdhh.js'
  function audioLoading (event) {
    if (event) this.aLoading = false
    if (this.audioPlay) {
      this.audioPlay()
    }
  }
  function aErr (event) {
    if (event) this.playerr = event
    this.$emit('audio_err', event)
  }

  function aEnd (event) {
    if (event) this.$refs.progress.style.width = '0%'
    this.play = !this.play
  }

  function aTimeUpdate (event) {
    if (this.$refs.progress) this.$refs.progress.style.width = (event.target.currentTime / event.target.duration) * 100 + '%'
  }

  export default {
    name: 'audioplay',
    props: {
      url: {
        type: String
      },
      autoPlay: {
        type: Boolean
      }
    },
    data () {
      return {
        aLoading: false,
        playerr: '',
        play: false
      }
    },
    mounted () {
      this.initAudio()
    },
    beforeDestroy () {
      this.playEnd()
    },
    methods: {
      initAudio () {
        let _this = this
        let audio = _this.$refs.audio
        audio.load()
        _this.aLoading = true
        audio.addEventListener('canplaythrough', audioLoading.bind(_this))
        audio.addEventListener('error', aErr.bind(_this))
        audio.addEventListener('ended', aEnd.bind(_this))
        setTimeout(function () {
          _this.aLoading = false
        }, 100000)
      },
      audioPlay () {
        let _this = this
        let audio = _this.$refs.audio
        _this.play = !_this.play
        if (_this.play) {
          audio.play()
          audio.addEventListener('timeupdate', aTimeUpdate.bind(this))
        } else {
          audio.pause()
        }
      },
      playEnd () {
        let _this = this
        let audio = _this.$refs.audio
        let progress = _this.$refs.progress

        _this.play = false
        progress.style.width = '0%'
        audio.pause()
        audio.currentTime = 0
        audio.removeEventListener('canplaythrough', audioLoading.bind(_this))
        audio.removeEventListener('error', aErr.bind(_this))
        audio.removeEventListener('ended', aEnd.bind(_this))
        audio.removeEventListener('timeupdate', aTimeUpdate.bind(_this))
      },
      closeAudio () {
        let _this = this
        let audio = _this.$refs.audio
        audio.pause()
        this.$emit('closeAudio')
      }
    }
  }
</script>
<style scoped>
  .audio {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }

  .audio:after {
    display: block;
    content: '';
    clear: both;
  }

  .audio-hide,
  .audio-hide audio {
    float: left;
    left: 0;
    bottom: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .audio-controlls {
    position: relative;
    float: left;
    padding: 8px 8px;
    background-color: #EEF1F6;
    border-radius: 15px;
    overflow: hidden;
  }

  .audio-controlls-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.6);
    text-align: center;
    overflow: hidden;
    z-index: 999;
  }

  .audio-play-btns:after {
    display: block;
    content: '';
    clear: both;
  }

  .audio-btn {
    cursor: pointer;
  }

  .audio-btn.play {
    float: left;
    width: 0;
    height: 0;
    border-left: 7px solid #8492A6;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    vertical-align: middle;
  }

  .audio-btn.pause {
    position: relative;
    float: left;
    width: 7px;
    height: 8px;
  }

  .audio-btn.pause::before,
  .audio-btn.pause::after {
    position: absolute;
    top: 0;
    height: 100%;
    content: '';
    border: 1px solid #8492A6;
    border-radius: 3px;
  }

  .audio-btn.pause::before {
    left: 0;
  }

  .audio-btn.pause::after {
    right: 0;
  }

  .audio-btn.close {
    position: relative;
    float: left;
    width: 8px;
    height: 8px;
  }

  .audio-btn.close::before,
  .audio-btn.close::after {
    position: absolute;
    top: -1px;
    left: 2px;
    height: 100%;
    content: '';
    border: 1px solid #8492A6;
    border-radius: 3px;
  }

  .audio-btn.close::before {
    transform: rotate(45deg);
  }

  .audio-btn.close::after {
    transform: rotate(-45deg);
  }

  .audio-progress.outer {
    position: relative;
    float: left;
    width: 125px;
    height: 5px;
    background-color: #B0DDFF;
    border-radius: 2px;
    margin: 2px 8px;
  }

  .audio-progress.inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 5px;
    background-color: #20A0FF;
    border-radius: 2px;
  }

  .audio-progress.pointer {
    position: absolute;
    top: -5px;
    right: -9px;
    width: 8px;
    height: 12px;
    padding: 1px;

    border-radius: 5px;
    filter: alpha(opacity=100) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#CEEDFF, endcolorstr=#78C2FD, gradientType=0);
    background: -moz-linear-gradient(bottom, #CEEDFF, #78C2FD);
    background: -ms-linear-gradient(bottom, #CEEDFF, #78C2FD);
    background: -webkit-gradient(linear, 0 top, 0 bottom, from(#CEEDFF), to(#78C2FD));
  }

  .audio-progress.pointer .inner{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    filter: alpha(opacity=100) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#41AEFF, endcolorstr=#107FD1, gradientType=1);
    background: -moz-linear-gradient(bottom, #41AEFF, #107FD1);
    background: -ms-linear-gradient(bottom, #41AEFF, #107FD1);
    background: -webkit-gradient(linear, 0 top, 0 bottom, from(#41AEFF), to(#107FD1));
  }
</style>
