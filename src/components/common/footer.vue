<template>
	<mt-tabbar v-model="selected" @click.native="togo" fixed>
		<mt-tab-item id="default">
			<i class="fa fa-home fa-2x"></i><br/> 户外
		</mt-tab-item>
		<mt-tab-item id="main">
			<i class="fa fa-inbox fa-2x"></i> <br/>运动
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
