<template>
	<div class="wrap_app">
		<div class="eva_ul">
			<ul class="evals">
				<li v-for="(item,index) in list" :key="index">
					<div class="half_row">
						{{item.nickname}}
					</div>
					<div class="half_row right"> <span>{{item.createTime|minTime}}</span></div>
					<p class="eva_content">{{item.content}}</p>
						
				</li>
			</ul>
			<div class="forms">
				<mt-field  class="bord_rap" placeholder="请输入您的宝贵意见" type="textarea" rows="8" v-model="forms.content"></mt-field>
				<mt-button type="primary" size="large" @click="submits">确 定</mt-button>
			</div>
		</div>		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				stat: '',
				forms:{
					nickname:this.$store.state.userInfo.nickname||'',
					memberId:this.$store.state.userInfo.id||'',
					content:'',
				},
				list:[]
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() { //查询评价列表
				let that = this;
				that.isLoading = true
				var data = {}
				var url = "/Evaluate/GetEvaluate" 
				this.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.Status=='200') {
							that.list = res.Data;						
					}
				});
								
			},
			//详细信息
			submits() {
				let that = this;
				var url = "/Evaluate/InsertEvaluatesInfo" 
				var data = this.forms;
				that.$api.posts(url, data).then((res) => {
					if (res.Status == '200') {
							that.$toast({
							message: '提交成功！',
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
		padding: 5px;
		img {
			width: 5rem;
			height: 5rem;
		}
	}

	.forms{
		background-color: #e9eef4;
	}
	.bord_rap{
		border: 1px solid #e3e3e3;
	}
	.evals {
		background-color: #e9eef4;
		margin-bottom: 1rem;	
		li {
			width: 100%;
			display: block;
			margin-top: 12px;
			background: #FFF;
			.half_row {
				width: 50%;
				height: 2rem;
				padding: 10px;
				float: left;
				padding-left: 1rem;
				display: block;
				text-align: left;
				span {
					width: 100%;
					text-align: right;
					display: inline-block;
					line-height: 1.6rem;
					font-size: 0.8rem;
					color: #888!important;
				}
			}
			
			.eva_content {
				text-indent: 1rem;
				line-height: 2rem;
				font-size: 0.9rem;
				padding: 5px;
			}
		}
	}
</style>
