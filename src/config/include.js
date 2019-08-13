/*
* 通用引入，包含element-ui等
* */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 2.0
// 项目公用样式
import '@/assets/css/style.css';
import '@/assets/css/common.css';
// import 全局filter
import '@/utils/filter.js';
// import 全局方法
import '@/utils/method.js';
// use element-ui 2.0
Vue.use(ElementUI);

// // 前端登录COOKIE验证
// let sUserId = getCookie(cookieUserId);
// if (sUserId) {
//   store.commit('setToken', {
//     token: sUserId
//   });
// }
