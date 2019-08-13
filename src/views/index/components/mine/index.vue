<template>
    <div class="wrap_app">
		<div class="wrap_tx">
			<div class="pie_tx"><img :src="$store.state.userInfo.headimgurl" ></div>
			<p>{{$store.state.userInfo.nickname}}</p>
			<p class="member_num">会员编号:{{$store.state.userInfo.id}}</p>
		</div> 
		 <mt-cell title="余额" :to="{path:'/mine/charge'}"  is-link class="bord_rap" :value="$store.state.userInfo.balance"></mt-cell>
        <mt-cell title="常用地址" :to="{path:'/mine/address'}" is-link  :value="$store.state.userInfo.address" class="bord_rap"></mt-cell>
        <mt-cell title="绑定手机" v-if="$store.state.userInfo.bindPhone==''" :to="{path:'/mine/bind'}"  :is-link="$store.state.userInfo.bindPhone==''"  :value="$store.state.userInfo.bindPhone" class="bord_rap"></mt-cell>
		<mt-cell title="绑定手机" v-if=" $store.state.userInfo.bindPhone!=''"  :is-link="$store.state.userInfo.bindPhone==''"  :value="$store.state.userInfo.bindPhone" class="bord_rap"></mt-cell>
		 <mt-cell title="配送范围" to="https://mp.weixin.qq.com/s/vCm_F6oj6oFiQ8cYDZOKTw" is-link class="bord_rap"></mt-cell>
        <mt-cell title="充值记录"  :to="{path:'/mine/recharge'}" is-link class="bord_rap"></mt-cell>
		 <mt-cell title="意见反馈" :to="{path:'/mine/opin'}"  is-link class="bord_rap"></mt-cell>
		<mt-cell title="我的推广用户" :to="{path:'/mine/exten'}" is-link class="bord_rap"></mt-cell>		 
        <mt-cell title="推广二维码" :to="{path:'/mine/qCode'}"  is-link class="bord_rap"></mt-cell>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                detail:{},
                stat:'',
				openId:this.$store.state.openId,
            }
        },
        created() {
          	this.getMember()
        },
        methods: {
            //详细信息
           toGo(path){
			   let that = this;
			   paths= '/'+path
			   that.$router.push({
			   	path: path,
			   })
		   },
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

<style lang="less" scoped="scoped">
	.member_num{
		font-size: 1rem;
		line-height: 1.5rem!important;
		height: 1.5rem!important;
	}
	.wrap_tx{
		width: 96%;
		background-color: #FFF;
		background: url(../../../../../static/img/bgg.jpg) no-repeat center;
		background-size:100% 100%; 
		border-radius: 5px;
		padding-top: 2rem;
		padding-bottom: 10px;
		margin: 0 auto;
		margin-bottom: 1rem;
		margin-top: 1rem;		
		.pie_tx{
			width: 100%;
			text-align: center;
			img{
				width: 5rem;
				height: 5rem;
			}
		}
		p{
			width: 100%;
			height: 3rem;
			line-height: 3rem;
			font-size: 1.2rem;
			text-align: center;
			color: #FFF;
		}
	}
	.wrap_app{
		overflow: hidden;
		margin-bottom: 3.45rem;
		img{
			width: 5rem;
			height: 5rem;
		}
	}
	.bord_rap{
		border: 1px solid #e3e3e3;
		background: #FFF!important;
	}
    .mint-cell-title{min-width: 100px}
    .mint-cell-value{
        padding: 10px 0;
        line-height: 20px
    }
    .stat-col{min-height: auto}
    .stat-col .mint-cell-wrapper{
        background-image:none!important;
        line-height: 30px
    }
    .stat-a span{color: #7287f0}
    .stat-b span{color: #f77f98}
    .pswp .pswp__button--fs{display: none!important}

	.detail_good{
		width: 30%;
		height: 5rem;
		float: left;
		h5{
			font-size: 1rem;
			line-height: 3rem;			
		}
	}
	.allMoney{
		height: 5rem;
		line-height: 5rem;
		width: 100%;
		font-size: 1.3rem;
		color: #4CAF50;
		text-align: right;
		display: block;
	}
	.good_box{
		border: 1px #e3e3e3 solid;
		padding: 0.3rem;
		margin: 0.3rem;
		background: #FFF;
		overflow: hidden;
	}
</style>
