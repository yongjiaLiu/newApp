<template>
	<div class="wrap_app">

		<div class="eva_ul">
			<ul class="evals" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
			 :infinite-scroll-immediate-check="true">
				<li v-for="(item,index) in list" :key="index">
					 <mt-cell title="订单号:" :value="item.number"></mt-cell>
					 <mt-cell title="充值金额:">
						  <span>{{item.money}}元</span>
					 </mt-cell>
					    <mt-cell title="充值时间:" :value="item.createTime"></mt-cell>
						
				</li>
			</ul>
			<div class="loading-box tc" v-if="isLoading">
				<mt-spinner type="snake" class="loading-more"></mt-spinner>
				<span class="loading-more-txt">加载中...</span>
			</div>
            <div class="no-stat" v-if="(!list)||(list.length<1)">暂无数据</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				isLoading: false,
				list: [],
				pageIndex: 1,
				pageNum: 10,
				currentPage: 1,
				totalPage: 0,
				status:'1',
			}
		},

		created() {
			this.getList()
		},
		methods: {
			loadMore() {
				let that = this;
				that.loading = true; //加载中
				that.isLoading = true //设置加载更多种
				if (that.pageIndex >= that.totalPage) {
					that.isLoading = false
					return
				}
				that.pageIndex += 1;
				setTimeout(() => {
					that.getList()
				}, 100)
			},
			getList() { //查询评价列表
				let that = this;
				that.isLoading = true
				var data = {
					memberId:this.$store.state.userInfo.id
				}
				var url = "/Recharge/GetRechargeByMemberId" 
				this.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.Status=='200') {
						that.list = res.Data;
						that.loading = false;
						that.isLoading = false
					}
				});
								
			},

		},
	}
</script>

<style lang="less">
	.mint-cell-value{
		font-size: 0.8rem!important;
	}
	.wash_img{
		width: 4.5rem;
		height:8rem;
		display: block;
		float: left
	}
	.eva_ul {
		position: relative;
		top: 0;
		bottom: 56px;
		left: 0;
		right: 0;
	}
	.computed_true{
		background: #FFF;
		padding: 1rem 0.5rem;
		width:100%;
		position: fixed;
		z-index: 9999;
		top: 0;
		span{
			font-size: 1.2rem;
			line-height: 2.4rem;
		}
	}
	.payBtn{
		float: right;
	}
	.evals {
		background-color: #e9eef4;
		margin-bottom: 56px;
		li {
			width: 100%;
			overflow: hidden;
			display: block;
			margin-top: 12px;
			background: #FFF;
			.half_row {
				width: 50%;
				height: 8.5rem;
				padding: 10px;
				float: left;
				padding-left: 1rem;
				display: block;
				text-align: left;
				span{
					width: 100%;
					text-align: right;
					display: inline-block;
					line-height: 1.6rem;
					font-size: 1rem;
					color: cornflowerblue;
					.mon{
						font-weight: 700;
						color: red!important;
					}
				}
			}
			.eva_contents {
				text-indent: 1rem;
				line-height: 2rem;
				font-size: 1rem;
				padding: 5px;
			}
		}
	}
	.right{
		text-align: right!important;
	}
	.eval_bottom {
		position: relative;
		top: 0;
		left: 0;
		color: #FFF;
		width: 100%;
	}
	
	
	// 加载中。。。
	.loading-box {
		padding: 0.1rem 0;
		text-align: center;
		.loading-more {
			display: inline-block;
			vertical-align: middle;
			margin-right: .2rem;
		}
	
		.loading-more-txt {
			vertical-align: middle;
			font-size: .22rem;
		}
	}
	.no-stat{
	    position: absolute;
	    top: 100%;
	    width: 100%;
	    text-align: center;
	    font-size: 20px;
	    color: #5168c8
	}
</style>
