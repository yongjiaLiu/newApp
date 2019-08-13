<template>
	<div class="wrap_app">
		<div class="code_wrap">
			<img :src="codeSrc" alt="">
		</div>
		<p class="code_con">截图将此二维码转发给朋友</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				stat: '',
				forms: {
					openId: this.$store.state.openId
				},
				codeSrc:''
			}
		},
		created() {
			this.getQcode()
		},
		methods: {
			//详细信息
			getQcode() {
				let that = this;
				var url = "/Promote/GetQrcodeTicket";
				var data = this.forms;
				that.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						this.codeSrc = res.Data
					}
				});
			}

		}

	}
</script>

<style lang="less" scoped="scoped">
	.wrap_app {
		overflow: hidden;
		margin-bottom: 3.45rem;

		img {
			width: 5rem;
			height: 5rem;
		}
	}

	.code_wrap {
		width: 100%;
		overflow: hidden;
		text-align: center;
		min-height: 18rem;
		margin-top:5rem;
		background-color: #e9eef4;
		img{
			width: 90%;
			height:100%;		
		}
	}
	.code_con{
		line-height: 3rem;
		font-size: 1rem;
		text-align: center;
	}
	.bord_rap {
		border: 1px solid #e3e3e3;
	}
</style>
