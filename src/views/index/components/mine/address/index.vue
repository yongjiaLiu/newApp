<template>
	<div class="wrap_app">
		<div class="forms">
			<mt-field label="联系人" class="bord_rap" placeholder="请输入联系人姓名" type="url" v-model="forms.linkName"></mt-field>
			<mt-field label="联系电话" class="bord_rap" placeholder="请输入联系电话" type="tel" v-model="forms.phone"></mt-field>
			<mt-field label="地址" class="bord_rap" placeholder="请输入详细地址" type="textarea" rows="8" v-model="forms.address"></mt-field>
			<mt-button type="primary" size="large" @click="submits">保 存</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				stat: '',
				userInfo: this.$store.state.userInfo,
				forms: {
					linkName: this.$store.state.userInfo.linkName || '',
					phone: this.$store.state.userInfo.phone || '',
					address: this.$store.state.userInfo.address || '',
				}
			}
		},
		created() {

		},
		methods: {
			//详细信息
			submits() {
				let that = this;
				var url = "/Member/UpdateMemberAddr/" + this.$store.state.userInfo.id;
				var data = this.forms;
				that.$api.put(url, data).then((res) => {
					if (res.Status == '200') {
						this.userInfo.linkName = this.forms.linkName;
						this.userInfo.phone = this.forms.phone;
						this.userInfo.address = this.forms.address;
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

	.forms {
		background-color: #e9eef4;
	}

	.bord_rap {
		border: 1px solid #e3e3e3;
	}
</style>
