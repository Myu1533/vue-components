<template>
  <div class="upLoad">
    <div class="userConsole-wrapper-right-title">
      <h2>上传节目</h2>
    </div>
    <div id="drop_area">
      <p><i class="drop-area-icon"><img src="./img/upload.svg" alt=""></i></p>
      <p>点击或将音频文件拖拽到这里</p>
      <input type="file" multiple @change="handleInputChange($event)">
    </div>
    <div id="out-input" class="out-input" v-if="files.length">
      <div class="out-input-item" v-for="(file,index) in files" :key="file.name">
        <span>{{index + 1}}.</span> <span class="out-input-item-name">{{file.name}} </span><span
        class="file-size">{{file.size | fomatFileSize}}</span>
        <div class="upload-prograss">
          <div class="upload-prograss-outer">
            <div class="upload-prograss-inner" :style="'width:' + file.progress + '%'"></div>
          </div>
          <div class="upload-failed-tips" v-if="file.uploadStatus === 'failed'">
            错误提示
          </div>
          <uploadProgress :percent="file.progress" :status="file.uploadStatus"
                          @cancelReq="handleCancelReq(file,index)"></uploadProgress>
        </div>
      </div>
    </div>
    <div class="out-input" v-else>
      <ol type="1">
        <li>每次最多上传20条音频节目</li>
        <li>我们支持MP3文件格式，请尽量上传高音质音频，请遵守版权声明相关规定，只上传版权拥有者允许你上传的声音文件，如上传盗版内容，将会导致下架、封号、索赔，甚至被追究刑事责任。</li>
      </ol>
    </div>
  </div>
</template>
<script>
  import uploadProgress from './upload-progress.vue'
  export default {
    name: 'MYupload',
    mounted(){
      this.initDrag();
    },
    props:{
    	action: {
    		type: String
      },
      maxList: {
    		type: Number
      }
    },
    data(){
      return {
        files: [],
        btn_diabled: true,
        countUploadSuccess: 0
      }
    },
    methods: {
      initDrag(){
        let self = this;
        let BreakException = {};
        let drop_area = document.querySelector("#drop_area");

        // 阻止默认的拖拽事件监听
        document.addEventListener('dragleave', function (e) {
          e.preventDefault();
        });
        document.addEventListener('drop', function (e) {
          e.preventDefault();
        });
        document.addEventListener('dragenter', function (e) {
          e.preventDefault();
        });
        document.addEventListener('dragover', function (e) {
          e.preventDefault();
        });

        drop_area.addEventListener('drop', function (e) {
          if (!e) return;
          self.handleFileCheck(e.dataTransfer.files);
        });
      },
      handleInputChange(event){
        if (!event) return;
        this.handleFileCheck(event.target.files);
      },
      handleFileCheck(data){
        let self = this;
        let files = [].slice.call(data);
        let len = files.length;

        if (len > self.maxList) {
          self.$alert('不超过二十个文件');
          return false;
        }

        try {
          files.forEach(function (item, index) {
            if (!item.type.match('audio/mp3')) {
              alert('只接收MP3文件');
              throw new Error('上传文件错误');
            } else {
              if (self.files.length < self.maxList) {
                let file = {
                  uid: Date.now() + index,
                  name: item.name,
                  size: item.size,
                  uploadStatus: 'ready',
                  progress: 0,
                  raw: item,
                  cancelReq: null
                };
                self.files.push(file);
              } else {
                alert('上传列表已经达到上限')
              }

            }
          });
        } catch (err) {
          self.files.splice(0, self.files.length);
          return false;
        }
        self.uploadFiles();
      },
      uploadFiles(){
        let self = this;
        let files = self.files;
        files.forEach(function (item, index) {
          if (item.uploadStatus === 'ready') {
            let fd = new FormData();
            fd.append('file', item.raw);
            self.axios.post( self.action?self.action:'', fd, {
              onUploadProgress: function (progressEvent) {
                if (progressEvent.loaded !== 0) {
                  item.uploadStatus = 'uploading';
                }
                item.progress = parseInt(progressEvent.loaded / progressEvent.total * 100);
              },
              cancelToken: new self.axios.CancelToken(function executor(c) {
                item.cancelReq = c;
              })
            }).then(response => {
              if (response && response.data.succeed) {
                item.uploadStatus = 'success';
                self.countUploadSuccess++;
                if (self.countUploadSuccess === self.files.length) {
                  self.btn_diabled = false;
                }
              } else {
                item.uploadStatus = 'failed';
              }
            }, response => {
              item.uploadStatus = 'failed';
            })
          }
        })
      },
      handleCancelReq(){
      	if(confirm('确定要删除上传的节目？')){
          let arg = Array.prototype.slice.call(arguments);
          this.files.splice(arg[1], 1);
          arg[0].cancelReq();
        }
      },
      resetFileList(){
        this.files.splice(0, this.files.length);
        this.btn_diabled = true;
      }
    },
    components: {
      uploadProgress
    },
    filters: {
      fomatFileSize(val){
        let i = val / (1024 * 1024);
        return i.toFixed(1) + 'M';
      }
    }
  }
</script>
<style>
  .upLoad .btn-selAudio {
    position: relative;
    margin: 60px 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .upLoadTips {
    font-size: 14px;
    color: #ccc;
    line-height: 25px;
  }

  .upLoad ol {
    text-align: left;
    padding: 15px;
  }

  .upLoad ol li {
    line-height: 20px;
  }

  .upLoad .el-upload {
    display: block;
    width: 70%;
    margin: 0 auto;
  }

  .upLoad .el-upload-dragger {

    width: 100%;
  }

  #drop_area {
    width: 536px;
    height: 200px;
    background-color: #F3f3f3;
    margin: 20px auto;
    padding-top: 40px;
    border: 1px solid #F3f3f3;

    text-align: center;

    cursor: pointer;

    position: relative;
  }

  #drop_area:hover {
    /*color: #ff4d51;*/
    border: 1px dashed #ff4d51;
  }

  #drop_area:hover .drop-area-icon {
  }

  .drop-area-icon {
    display: inline-block;
    width: 80px;
  }

  .drop-area-icon > img {
    width: 100%;
  }

  #drop_area input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

    cursor: pointer;
  }

  .out-input {
    font-size: 14px;
    color: #c0c0c0;
  }

  .out-input li {
    margin: 10px 0;
  }

  .out-input-item {
    text-align: left;
    padding: 20px 0;
    border-bottom: 1px solid #FAFAFA;
  }

  .out-input-item-name {

    padding: 0 10px;
    color: #333333;
  }

  .upload-prograss {
    position: relative;
    width: 100%;
  }

  .upload-prograss-outer {
    width: 400px;
    height: 14px;
    background-color: #f4f4f4;
    border-radius: 7px;
    margin: 15px 0 0 5px;

    position: relative;

    overflow: hidden;
  }

  .upload-prograss-inner {
    width: 0%;
    height: 14px;
    background-color: #ff4d51;
    border-radius: 7px;

    position: absolute;
    top: 0;
    left: 0;

    transition: width 0.1s;
  }

  .upload-prograss-status {
    min-width: 80px;
    height: 14px;
    line-height: 14px;
    color: #999999;

    position: absolute;
    top: 0;
    right: 0;
  }

  .upload-prograss-status > div {
    display: inline-block;
  }

  .upload-prograss-status > .cancelReq {
    width: 16px;
    height: 16px;
    opacity: 0.6;
    cursor: pointer;
  }

  .upload-failed-tips {
    padding-left: 8px;
    line-height: 30px;
  }

  .upload-status-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }

  .upload-status-icon > img {
    width: 100%;
    height: 100%;
  }

  .out-input-btns {
    margin: 15px 0;
  }
</style>
