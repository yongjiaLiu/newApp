<template>
  <div class="wrap_app">
    <div class="top_nn">
      <div class="defaults_search"><Search></Search></div>
      <WheelSwipe></WheelSwipe>
    </div>
    <ul class="main_Nav">
      <li>
        <img src="../../../../../static/img/icons.png" alt="" />
        <br />
        <p>徒步穿越</p>
      </li>
      <li>
        <img src="../../../../../static/img/icons.png" alt="" />
        <br />
        <p>登山探险</p>
      </li>
      <li>
        <img src="../../../../../static/img/icons.png" alt="" />
        <br />
        <p>环球旅行</p>
      </li>
      <li>
        <img src="../../../../../static/img/icons.png" alt="" />
        <br />
        <p>全部分类</p>
      </li>
    </ul>
    <div class="jxlx"><img src="../../../../../static/img/jxsp.png" alt="" /></div>
    <ul class="gd_list">
      <li>
        <img src="../../../../../static/img/shangp.png" alt="" />
        <br />
        <p class="goods_title">华为智能手环</p>
        <p class="goods_m">￥5000</p>
      </li>
    </ul>
  </div>
</template>

<script>
import WheelSwipe from '@/components/common/swipe';
import Search from '@/components/common/search/search';
export default {
  data() {
    return {
      actList: []
    };
  },
  components: {
    WheelSwipe,
    Search
  },
  created() {},
  methods: {
    goRouter(index) {
      let that = this;
      that.$router.push({
        name: 'market',
        params: {
          index: index
        }
      });
    },
    toAct(id) {
      let that = this;
      that.$router.push({
        path: '/active',
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="scoped">
.wrap_app {
  background-color: #e9eef4;
  margin-bottom: 3.45rem;
  font-family: 'sans-serif' !important;
}
.top_nn {
  position: relative;
  width: 100%;
}
.defaults_search {
  position: absolute;
  width: 100%;
  z-index: 999;
}
.main_Nav {
  width: 96%;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  margin: 0.5rem auto;

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

.jxlx {
  width: 100%;
  padding: 8px 0;
  margin: 5px 0;
  text-align: center;
  background: #fff;
  img {
    width: 50%;
  }
}
.gd_list {
  width: 100%;
  overflow: hidden;
  padding: 5px;
  li {
    width: 46%;
    margin: 2%;
    overflow: hidden;
    text-align: center;
    background: #fff;
    padding: 1rem 5px;
    border-radius: 5px;
    img {
      width: 80%;
    }
  }
  .goods_title {
    text-align: left;
    text-indent: 0.8rem;
    letter-spacing: 0px;
    color: #333333;
    font-size: 1rem;
  }
  .goods_m {
    text-align: left;
    text-indent: 0.8rem;
    letter-spacing: 0px;
    color: #fa607d;
    font-size: 1rem;
  }
}
</style>
