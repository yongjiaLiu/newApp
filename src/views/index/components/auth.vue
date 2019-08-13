<template>
	<div>

	</div>
</template>

<script>
	import {getUrlParams} from '@/api/getQueryString'
	export default {
		name: 'Auth',
		data() {
			return {
				code: '',
				openId: '',
				userDetail: [],
				userType: "",
				roles: [],
				userData: [],
				state: getUrlParams().state,
			}
		},
		computed: {
			sta() {
				return this.state.substring(0, 1)
			}
		},
		created() {

		},
		mounted() {
			this.queryOpenId()
		},
		methods: {
			queryOpenId() {
				let that = this;
				var url = "/WeUser";
				var data = {
					code: getUrlParams().code
				};
				that.$api.get(url, data).then((res) => {
					if (res.Status == 200) {
						sessionStorage.setItem("actUserInfo", res.Data);
						this.$store.dispatch('actUserInfo', res.Data);
						sessionStorage.setItem("openId", res.Data.openId);
						this.$store.dispatch('openId', res.Data.openId);
						return res.Data.bindPhone
					}
				}).then((phone) => {
					if(phone==""){
						this.$toast({
							message: '请绑定手机号！'
						});
						this.$router.push("/mine/bind");
						return
					}
					switch (this.sta) {
						case '1':
							this.$router.push("/main");
							break;
						case '2':
							this.$router.push({
								path: '/active',
								query: {
									id: 2
								}
							})
							break;
						case '3':
							this.$router.push({
								path: '/active',
								query: {
									id: 1
								}
							})
							break;
						case '4':
							this.$router.push("/mine/charge");
							break;
						case '5':
							this.$router.push("/mine");
							break;
						default:
							this.$router.push("/main");
							break;
					}
				})
			},
		}
	}
</script>

<style>

</style>
