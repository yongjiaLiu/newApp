<template>
	<div class="wrap_app">
		<div class="default_search">
			<Search></Search>
		</div>
		<WheelSwipe></WheelSwipe>
		<ul class="main_Nav">
			<li>
				<img src="../../../../static/img/icons.png" alt=""/>
				<br />
				<p>徒步穿越</p>
			</li>
			<li><img src="../../../../static/img/icons.png" alt=""/><br />
				<p>徒步穿越</p>
			</li>
			<li><img src="../../../../static/img/icons.png" alt=""/><br />
				<p>徒步穿越</p>
			</li>
			<li><img src="../../../../static/img/icons.png" alt=""/><br />
				<p>全部分类</p>
			</li>
		</ul>


	</div>

</template>

<script>
	import WheelSwipe from "@/components/common/swipe"
	import Search from "@/components/common/search/search"
	export default {
		data() {
			return {
				actList: [],
			}
		},
		components: {
			WheelSwipe,
			Search
		},
		created() {
			this.getAct()
		},
		methods: {
			goRouter(index) {
				let that = this;
				that.$router.push({
					name: 'market',
					params: {
						index: index
					}
				})
			},
			toside(i) {
				switch (i) {
					case 0:
						window.open('https://mp.weixin.qq.com/s/p96tHlDzaYWzKKJmRab-Zg')
						break;
					case 1:
						window.open('https://mp.weixin.qq.com/s/p96tHlDzaYWzKKJmRab-Zg')
						break;
					case 2:
						window.open('https://mp.weixin.qq.com/s/XW-QWi9l8exVsWzdV49YdA')
						break;
					case 3:
						window.open('https://mp.weixin.qq.com/s/fTIJWdh3gW8a8IjfYIEAkg')
						break;
					default:
						break;
				}
				//windows.open()
			},
			toAct(id) {
				let that = this;
				that.$router.push({
					path: '/active',
					query: {
						id: id
					}
				})
			},
			getAct() {
				let that = this;
				var data = {};
				var url = "/Activity/getAllActivityList";
				that.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.Status == '200') {
						this.actList = res.Data
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="scoped">
	.wrap_app {
		background-color: #e9eef4;
		margin-bottom: 3.45rem;
		font-family: "sans-serif" !important;
	}

	.main_Nav {
		width: 96%;
		overflow: hidden;
		background: #FFF;
		border-radius: 5px;
		margin: 0 auto;

		li {
			width: 25%;
			float: left;
			overflow: hidden;
			text-align: center;
			padding: 0.5rem;
			img {
				width: 60px;
				height: 60px;
			}
		}
	}
</style>
