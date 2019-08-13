<template>
	<div class="wrap_app">
		<div class="code_wrap">
			<img :src="detail.pic" alt="">
		</div>
		<p class="code_con hot">{{detail.name}}</p>
		<p class="des_content">{{detail.describe}}</p>
		<mt-button type="primary" size="large" @click="submits">立 即 下 单</mt-button>
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
			this.getDetail()
		},
		methods: {
			//详细信息
			getDetail() {
				let that = this;
				var url = "/Activity/GetActivityById/"+this.$route.query.id;
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						this.detail = res.Data
					}
				});
			},
			submits(){
				let that=this;
				var data = {
					openId :this.$store.state.openId
				}
				var url = ""
				if(this.$route.query.id==1){
					url ="/Activity/BuyVIPActivity";
				}else{
					url ="/Activity/BuyPromoteActivity"
				}
				that.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						that.$toast({
							message: '操作成功！',
							iconClass: 'el-icon-check'
						});
						that.$router.push({
							name: 'washBox'
						})
					}else{
						that.$toast({
							message: res.Message,
							iconClass: 'el-icon-close'
						});
						setTimeout(()=>{
							that.$router.push({
								name: 'mine/qCode'
							})
						},2000)
						
					}
				})
			}

		}

	}
</script>

<style lang="less" scoped="scoped">
	.wrap_app {
		overflow: hidden;
		margin-bottom: 3.45rem;
		background: #FFF;
		padding: 5px;
		img {
			width: 5rem;
			height: 5rem;
		}
	}

	.code_wrap {
		width: 100%;
		overflow: hidden;
		text-align: center;
		min-height: 3rem;
		margin-top:5rem;
		background-color: #e9eef4;
		img{
			width: 90%;
			height:100%;		
		}
	}
	.hot{
		color: orangered;
		font-size: 1.2rem!important;
	}
	.code_con{
		line-height: 3rem;
		font-size: 1rem;
		text-align: center;
	}
	.bord_rap {
		border: 1px solid #e3e3e3;
	}
	.des_content{
		text-align: left;
		font-size: 1rem;
		line-height: 2rem;
		text-indent: 2rem;
		padding: 10px;
	}
</style>
