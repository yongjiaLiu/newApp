<template>
  <div class="wrap_app">
    <div class="top_nn">
      <div class="defaults_search"><Search></Search></div>
      <WheelSwipe></WheelSwipe>
    </div>

    <ul class="main_Nav">
      <li>
        <img src="../../../../static/img/icons.png" alt="" />
        <br />
        <p>徒步穿越</p>
      </li>
      <li>
        <img src="../../../../static/img/icons.png" alt="" />
        <br />
        <p>徒步穿越</p>
      </li>
      <li>
        <img src="../../../../static/img/icons.png" alt="" />
        <br />
        <p>徒步穿越</p>
      </li>
      <li>
        <img src="../../../../static/img/icons.png" alt="" />
        <br />
        <p>全部分类</p>
      </li>
    </ul>
    <ul class="ul_type">
      <li>
        <img src="../../../../static/img/index/actives.png" alt="" />
        <p>川藏线</p>
      </li>
      <li>
        <img src="../../../../static/img/index/actives.png" alt="" />
        <p>川藏线</p>
      </li>
      <li>
        <img src="../../../../static/img/index/actives.png" alt="" />
        <p>川藏线</p>
      </li>
      <li>
        <img src="../../../../static/img/index/actives.png" alt="" />
        <p>川藏线</p>
      </li>
    </ul>
    <div class="jxlx"><img src="../../../../static/img/jxlx.png" alt="" /></div>
    <ul class="lx_wrap">
      <li>
        <img src="../../../../static/img/index/anli.png" alt="" />
        <p class="lx_head">
          <span class="lx_ma">天然温泉</span>
          <span class="lx_mb">徒步穿越</span>
        </p>
        <div class="lx_detail">
          <h5>西藏羊八斤</h5>
          <p class="lx_cont">羊八井10天9夜金典徒步穿越山峰</p>
          <p class="lx_am">
            <span class="address">
              <i class="el-icon-location"></i>
              拉萨
            </span>
            <span class="monney">$2000/人起</span>
          </p>
        </div>
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
.ul_type {
  width: 96%;
  overflow: hidden;
  margin: 10px auto;
  li {
    width: 48%;
    margin: 1%;
    float: left;
    height: 5rem;
    display: -webkit-flex;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    position: relative;
    img {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    p {
      width: 100%;
      text-align: center;
      color: #fff;
      z-index: 999;
      font-weight: normal;
      font-stretch: normal;
      line-height: 5rem;
      letter-spacing: 1px;
      background: rgba(0, 0, 0, 0.3);
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
.lx_wrap {
  width: 96%;
  overflow: hidden;
  margin: 0.5px auto;
  li {
    border-radius: 5px;
    width: 100%;
    height: 11rem;
    overflow: hidden;
    position: relative;
    img {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .lx_head {
      z-index: 999;
      width: 100%;
      position: absolute;
      text-align: right;
      color: #fff;
      margin-top: 0.5rem;
      span {
        padding: 2px 0.5rem;
        margin-right: 0.3rem;
        font-size: 0.8rem;
        line-height: 1.2rem;
      }
      .lx_ma {
        background-color: #30d2ca;
        box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 0.75);
      }
      .lx_mb {
        background-color: #fa607d;
        box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 0.75);
      }
    }
    .lx_detail {
      width: 60%;
      height: 5rem;
      position: absolute;
      bottom: 2rem;
      left: 0;
      z-index: 999;
      background: rgba(255, 255, 255, 0.8);
      padding-left: 1rem;
      h5 {
        letter-spacing: 0px;
        color: #5680fa;
        font-size: 1.1rem;
        line-height: 2rem;
      }
      .lx_cont {
        text-align: left;
        letter-spacing: 0px;
        color: #6e788c;
        font-size: 0.8rem;
        line-height: 1.2rem;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
      }
      .lx_am {
        width: 100%;
        overflow: hidden;
        line-height: 1.8rem;
        .address {
          display: block;
          float: left;
          letter-spacing: 0px;
          color: #6e788c;
          font-size: 0.7rem;
          float: left;
        }
        .monney {
          display: block;
          float: right;
          letter-spacing: 0px;
          color: #6e788c;
          font-size: 0.7rem;
          padding-right: 1rem;
        }
      }
    }
  }
}
</style>
