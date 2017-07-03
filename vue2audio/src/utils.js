/**
 * Created by MDHH on 2017/7/3.
 */
function audioLoading(event){
  if(event) this.aLoading = false;
  if(this.audioPlay){
    this.audioPlay();
  }
}
function aErr(event){
  if(event) this.playerr = event;
  
  this.$emit('audio_err',event);
}
function aEnd(event){
  if(event) this.$refs.progress.style.width = '0%';
  this.play = !this.play;
}
function aTimeUpdate(event){
  let t = event.target;
  if(this.$refs.progress) this.$refs.progress.style.width = (t.currentTime / t.duration) * 100 + '%';
}

module.exports = {
  audioLoading,
  aErr,
  aEnd,
  aTimeUpdate
};
