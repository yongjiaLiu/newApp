<template>
	<div class="default_search">
		<el-input placeholder="请输入内容" v-model="value" @focus="getForcus" @blur="loseForcus">
			<i slot="prefix" class="el-input__icon el-icon-search" ></i>
			<el-button slot="append" icon="el-icon-search" v-if="isShow"></el-button>
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
		margin-top: 5px;
		
	}
	.el-input__inner{
		border: none!important;
	}
	
</style>
