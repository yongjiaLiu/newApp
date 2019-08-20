<template>
	<div class="swipe-wrap">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="(item,index) in list" :key="index"> <img :src="item.pic" alt="" class="rob_img"> </mt-swipe-item>
     <!-- <img src="../../../static/img/index/banner.png" alt=""> -->
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        type:null,
				list:[{pic:'../../../static/img/index/banner.png'},{pic:'../../../static/img/index/banner.png'},{pic:'../../../static/img/index/banner.png'},]
			}
		},
		created(){
      console.log(this.$route.path)
        if(this.$route.path=='/default'){
          this.type = 1
        }else{
           this.type = 2
        }
			this.getImg()
		},
		methods: {
			handleChange(i) {
				console.log(i)
			},
			getImg(){
				let that = this;
				var url="/banner";
        var data = {
          type:this.type
        }
				this.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.code == '0') {
						that.list = res.data;
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
