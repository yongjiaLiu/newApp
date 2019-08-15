<template>
	<div class="default_search">
		<el-input placeholder="请输入内容" v-model="value" @focus="getForcus" @blur="loseForcus">
			<i slot="prefix" class="el-input__icon el-icon-search" ></i>
			<el-button slot="append" class="sert"> <span class="ser_btn">搜索</span></el-button>
		</el-input>
	</div>
</template>

<script>
	export default {
		name: "navMenu",
		data() {
			return {
				value: '',
				isShow:false
			}
		},
		methods: {
			getForcus(){
				let that = this;
				that.isShow = true;
			},
			loseForcus(){
				let that = this;
				that.isShow = false;
			}
		}

	}
</script>
<style lang="less" scoped="scoped">
	.default_search {
		width: 90%;
		overflow: hidden;
		line-height: 2rem;
		border-radius: 6rem;
		margin: 0 auto;
		margin-top: 0.5rem;

	}
	.el-input__inner{
		border: none!important;
	}
  .sert{
    background: #FFF!important;
    width: 5rem!important;
  }
  .ser_btn{
    padding: 5px 0.8rem;
    border-radius: 1rem;
    display: inline-block;
    background: #5680fa;
    color: #FFF;
    font-size: 0.8rem;
  }
</style>
