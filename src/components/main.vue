<template>
	<div>
		<div class="main">
			<router-view></router-view>
		</div>
		<navMenu class="zizz"></navMenu>
	</div>

</template>

<script>
	import navMenu from '@/components/common/footer'
	export default {
		name: 'mainIndex',
		components: {
			navMenu
		},
		data() {
			return {
				openId:this.$store.state.openId,
			}
		},
		created() {
			this.getMember()
		},
		methods: {
			getMember(){
				let that = this;
				var url = "/Member/GetMemberByOpenId";
				var data = {
					openId:this.openId
				}
				that.$api.get(url, data).then((res) => {
					console.log(res)
				    if (res.Status=='200') {
				        console.log(res.Data);
				     // that.detail=res.Data;
						if(res.Data){
							this.$store.dispatch('actUserInfo', res.Data);
						}					
				    }
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 3.45rem;
		background: #e9eef4;
	}
  .zizz{
    z-index: 9999;
  }
</style>