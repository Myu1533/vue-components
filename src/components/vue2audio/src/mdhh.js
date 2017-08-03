
export const audioLoading = function (event) {
  if (event) this.aLoading = false
  if (this.audioPlay) {
    this.audioPlay()
  }
}
export const aErr = function (event) {
  if (event) this.playerr = event
  this.$emit('audio_err', event)
}

export const aEnd = function (event) {
  if (event) this.$refs.progress.style.width = '0%'
  this.play = !this.play
}

export const aTimeUpdate = function (event) {
  if (this.$refs.progress) this.$refs.progress.style.width = (event.target.currentTime / event.target.duration) * 100 + '%'
}
