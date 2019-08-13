<template>
  <div class="foot_wrap" :class="selected=='1'?'huwai':selected=='3'?'wode':'yundong'">
    <ul>
      <li @click="choose(1)"></li>
      <li @click="choose(2)"></li>
      <li @click="choose(3)"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: '',
      }
    },
    methods: {
      choose(i) {
        let that = this;
        that.selected = i;
        switch (i) {
          case '1':
            break;
          case '2':
            break;
          case '3':
            break;
          default:
            break;
        }
      },
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
<style lang="less">
  .foot_wrap {
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom: 0;

    ul {
      width: 100%;
      overflow: hidden;

      li {
        width: 33.33%;
        height: 5rem;
        display: block;
        float: left;
        text-align: center;
      }
    }
  }

  .huwai {
    background: url(../../../static/img/foot/huwai.png) no-repeat center;
    background-size: 100% 100%;
  }

  .wode {
    background: url(../../../static/img/foot/wode.png) no-repeat center;
    background-size: 100% 100%;
  }

  .yundong {
    background: url(../../../static/img/foot/yundong.png) no-repeat center;
    background-size: 100% 100%;
  }
</style>
