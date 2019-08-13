<template>
	<div class="wrap_app">
		<div class="forms">
			<mt-field label="手机号码" class="bord_rap" placeholder="请输入手机号码" type="tel" v-model="forms.bindPhone"></mt-field>
			<mt-field label="验证码" v-model="forms.yzm">
				<mt-button type="primary" size="mini" @click="getCode" :disabled="disabled" class="smlbtn">{{btnName}}</mt-button>
			</mt-field>
			<mt-button type="primary" size="large" @click="submits">绑 定</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				stat: '',
				forms: {
					bindPhone: '',
				},
				btnName: '获取验证码',
				disabled: false,
				yzm: '',
				userInfo: this.$store.state.userInfo,
				totalTime: '',
				count:null
			}
		},
		created() {

		},
		methods: {
			//详细信息
			submits() {
				let that = this;
				if (this.forms.yzm != this.yzm) {
					that.$toast({
						message: '请输入正确的验证码！',
						iconClass: 'el-icon-check'
					});
					return
				}
				var url = "/Member/MemberBindPhone/" + this.$store.state.userInfo.id;
				var data = this.forms;
				that.$api.put(url, data).then((res) => {
					if (res.Status == '200') {
						this.userInfo.bindPhone = this.forms.bindPhone;
						this.$store.dispatch('actUserInfo', this.userInfo);
						that.$toast({
							message: '保存成功！',
							iconClass: 'el-icon-check'
						});
						that.$router.push({
							name: 'mine'
						})
					}
				});
			},
			getCode() {
				let that = this;
				if(!that.forms.bindPhone){
					that.$toast({
						message: '请输入手机号码！',
						iconClass: 'el-icon-check'
					});
					return
				}
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.btnName = this.count + 's重试'
							this.count--;
						} else {
							this.btnName = "获取验证码";
							this.disabled = false
							clearInterval(this.timer);
							this.timer = null;
						}

					}, 1000)

				}
				var data = {
					phone: this.forms.bindPhone
				};
				var url = "/Sms/SendSms";
				that.$api.post(url, data).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						this.disabled = true;
						this.yzm = res.Data
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
	.smlbtn{
		font-size: 0.8rem;
		padding: 0 0.3rem;
	}
	.forms {
		background-color: #e9eef4;
	}

	.bord_rap {
		border: 1px solid #e3e3e3;
	}
</style>
