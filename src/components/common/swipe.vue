<template>
	<div class="swipe-wrap">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="(item,index) in list" :key="index"> <img :src="item.pic" alt="" class="rob_img"> </mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		created(){
			this.getImg()
		},
		methods: {
			handleChange(i) {
				console.log(i)
			},
			getImg(){
				let that = this;
				var url="/Banner/getAllBannerList";
				this.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						that.list = res.Data;
					}
				});
			}
		}

	}
</script>
<style>
.swipe-wrap{
	height: 10rem;
}
.rob_img{
	width: 100%;
	overflow: hidden;
}
</style>
