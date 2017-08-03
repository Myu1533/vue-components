<template>
  <div class="audio">
    <div class="audio-controlls">
      <div class="audio-play-btns">
        <span class="audio-btn pause" @click="audioPlay" v-if="play"></span>
        <span @click="audioPlay" class="audio-btn play" v-else></span>
        <div class="audio-progress outer">
          <div class="audio-progress inner" ref="progress">
            <div class="audio-progress pointer" ref="audio_pointer"></div>
          </div>
        </div>
        <span class="audio-btn close" @click="closeAudio"></span>
      </div>
      <div class="audio-controlls-mask" v-if="aLoading">{{playerr}}</div>
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
  }

  .audio-hide,
  .audio-hide audio {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .audio-controlls {
    position: relative;
    display: inline-block;
    width: 171px;
    height: 25px;
    background-color: #F2F4F9;
    border-radius: 5px;
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

  .audio-btn {
    display: inline-block;
    cursor: pointer;
  }

  .audio-btn.play {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 0;
    height: 0;
    border-left: 6px solid #8492A6;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    vertical-align: middle;
  }

  .audio-btn.pause {
    position: absolute;
    top: 7px;
    left: 6px;
    width: 6px;
    height: 8px;
  }

  .audio-btn.pause::before,
  .audio-btn.pause::after {
    position: absolute;
    top: 0;
    height: 100%;
    content: '';
    border: 1px solid #8492A6;
  }

  .audio-btn.pause::before {
    left: 0;
  }

  .audio-btn.pause::after {
    right: 0;
  }

  .audio-btn.close {
    position: absolute;
    top: 7px;
    right: 4px;
    width: 8px;
    height: 8px;
  }

  .audio-btn.close::before,
  .audio-btn.close::after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    content: '';
    border: 1px solid #8492A6;
  }

  .audio-btn.close::before {
    transform: rotate(45deg);
  }

  .audio-btn.close::after {
    transform: rotate(-45deg);
  }

  .audio-progress.outer {
    position: absolute;
    display: inline-block;
    top: 10px;
    left: 18px;
    width: 125px;
    height: 5px;
    background-color: rgba(100, 149, 237, 0.3);
    border-radius: 2px;
  }

  .audio-progress.inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 5px;
    background-color: #6495ed;
    border-radius: 2px;
  }

  .audio-progress.pointer {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 4px;
    height: 12px;
    background-color: #107FD1;
    border-radius: 2px;
    box-shadow: inset 0 0 2px #ffffff;
  }
</style>
