// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/components/App.vue';
// axios
import http from 'axios'
import api from '@/api/index.js'
import global from '@/api/Global'
// include
import '@/config/include.js';
//mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

// 通用store
import store from '@/store/store.js';

// router
import router from './router/index.js';

// 关闭生产模式下给出的提示
Vue.prototype.$global = global;
Vue.config.productionTip = false;
Vue.prototype.$http = http 	//Axios请求
Vue.prototype.$api = api //api请求文件
Vue.prototype.$store = store
Vue.use(Mint)
/* eslint-disable no-new */


if (Number.parseInt == undefined) {
	Number.parseInt = window.parseInt
}
if (Number.parseFloat == undefined) {
	Number.parseFloat = window.parseFloat
}
//获取openId
let openId = sessionStorage.getItem('openId')
if (openId) {
	store.commit('setOpenId', openId);
} else {
	store.commit('setOpenId', null);
}

console.log(openId)
router.beforeEach((to, from, next) => {
	if (to.matched.length === 0) { //如果未匹配到路由
		from.name ? next({
			name: from.name
		}) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
	} else {
		next(); //如果匹配到正确跳转
	}
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
