<template>
    <div class="upload-prograss-status">
        <div class="upload-success" v-if="status === 'success'">
            <i class="upload-status-icon"><img src="./img/success.png" alt=""></i>
            <span>{{'上传成功'}}</span>
        </div>
        <div class="upload-failed" v-if="status === 'failed'">
            <i class="upload-status-icon"><img src="./img/fail.png" alt=""></i>
            <span>{{'上传失败'}}</span>
        </div>
        <div class="upload-uploading" v-if="status === 'uploading'">
            <i class="upload-status-icon"><img src="./img/upload2.png" alt=""></i>
            <span>正在上传{{ percent }}%</span>
        </div>
        <div class="upload-ready" v-if="status === 'ready'">
            <i class="upload-status-icon"><img src="./img/waiting.png" alt=""></i>
            <span>{{'等待上传'}}</span>
        </div>
        <span class="cancelReq el-icon-circle-cross" @click="cancelReq()"></span>
    </div>
</template>
<script>
	export default {
		name: 'upload-progress',
		props: {
			status: {
				type: String
			},
			percent: {
				type: Number
			}
		},
		methods: {
			cancelReq(){
				this.$emit('cancelReq');
			}
		}
	}
</script>
<style>

</style>
