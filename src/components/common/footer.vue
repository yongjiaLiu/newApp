<template>
	<mt-tabbar v-model="selected" @click.native="togo" fixed>
		<mt-tab-item id="default">
			<img slot="icon" :src="selected=='default'?'../../../static/img/foot/huwai1.png':'../../../static/img/foot/huwai2.png'"> 户外活动
		</mt-tab-item>
		<mt-tab-item id="active">
			<img slot="icon" :src="selected=='active'?'../../../static/img/foot/yundong2.png':'../../../static/img/foot/yundong1.png'">运动商品
		</mt-tab-item>
		<mt-tab-item id="mine">
			<i class="fa fa-user fa-2x"></i> <br/> 我的
		</mt-tab-item>
	</mt-tabbar>
</template>

<script>
	export default {
		name: "navMenu",
		data() {
			return {
				selected: 'default',
			}
		},
		methods: {
			togo() {
				let that = this;
				console.log(that.selected)
				var paths = that.selected;
				that.$router.push({
					name: paths
				})
			}
		}

	}
</script>
<style>

</style>
