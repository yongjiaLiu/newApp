<template>
	<div class="wrap_app">
		<div class="forms">
			<h3 class="pay_titles">加入VIP享会员折扣</h3>
			<h3 class="pay_title">请选择需要充值的金额</h3>
			<!-- <mt-field label="金额" class="bord_rap" placeholder="请输入充值金额" type="tel" v-model="forms.money"></mt-field> -->
			<mt-radio v-model="forms.money" :options="options">
			</mt-radio>
			<mt-button type="primary" size="large" @click="submits">充值</mt-button>
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible" :closeOnClickModal='false'>
		</mt-actionsheet>
	</div>
</template>

<script>
	import {
		jsSDK
	} from '@/utils/method.js'
	export default {
		data() {
			return {
				detail: {},
				stat: '',
				userInfo: this.$store.state.userInfo,
				forms: {
					money: '100',
					memberId: this.$store.state.userInfo.id
				},
				actions: [{
					name: '微信支付',
					method: this.vxPay,
				}, {
					name: '余额支付',
					method: this.yePay,
				}],
				sheetVisible: false,
				payForm: {
					"openId": this.$store.state.openId, //openId
					"orderId": "", //单号
					"amount": '', //总金额
					"payType": 1, //支付方式：1微信支付，2余额支付
					"orderType": 1 //订单类型: 1充值支付，2订单支付
				},
				options: [{
						label: '100元',
						value: '100',
					},
					{
						label: '200元',
						value: '200',
					},
					{
						label: '300元',
						value: '300',
					},
					{
						label: '400元',
						value: '400',
					},
					{
						label: '500元',
						value: '500',
					},
				]
			}
		},
		created() {

		},
		methods: {
			opens() {
				let that = this;
				that.sheetVisible = true
			},
			vxPay() {
				let that = this;
				var url = "/WechatPay/JSAPIPay"
				var data = this.payForm;
				data.amount = this.forms.money
				that.$api.posts(url, data).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						jsSDK(JSON.parse(res.Data))
					}
				})
			},
			yePay() {
				let that = this;
				that.sheetVisible = true
			},
			//详细信息
			submits() {
				let that = this;
				if (!this.$store.state.userInfo.bindPhone) {
					this.$toast({
						message: '请绑定手机号！'
					});
					this.$router.push("/mine/bind");
					return
				}
				var url = "/Recharge/AddRecharge"
				var data = this.forms;
				console.log(data)
				that.$api.post(url, data).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						this.payForm.orderId = res.Data
						return res.Data
					}
				}).then((data) => {
					this.vxPay()
				});
			},

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

	.forms {
		background-color: #e9eef4;
	}

	.bord_rap {
		border: 1px solid #e3e3e3;
	}

	.pay_title {
		font-size: 1rem !important;
		color: firebrick;
		line-height: 2rem;
		text-align: center;
		background: #FFF;
	}
	.pay_titles{
		font-size: 1.2rem !important;
		color: firebrick;
		line-height: 3rem;
		text-align: left;
		text-indent:1rem;
		background: #FFF;
	}
</style>
