/**
 * Created by MDHH on 2017/7/3.
 */
export const audioLoading = function (event) {
  if (event) this.aLoading = false;
  if (this.audioPlay) {
    this.audioPlay();
  }
};
export const aErr = function (event) {
  if (event) this.playerr = event;
  
  this.$emit('audio_err', event);
};
export const aEnd = function (event) {
  if (event) this.$refs.progress.style.width = '0%';
  this.play = !this.play;
};
export const aTimeUpdate = function (event) {
  if (this.$refs.progress) this.$refs.progress.style.width = (event.target.currentTime / event.target.duration) * 100 + '%';
};

// module.exports = {
//   audioLoading,
//   aErr,
//   aEnd,
//   aTimeUpdate
// };

// ERROR in static/jsendor.e84ae0c6c8bcbfcbbd83.js from UglifyJs
// Unexpected token: punc (,) [./~ue2audioc/mdhh.js:24,0][static/jsendor.e84ae0c6c8bcbfcbbd83.js:63527,14]
