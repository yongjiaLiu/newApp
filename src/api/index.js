import axios from 'axios'
import qs from 'qs'
import router from '../views/index/router'
import store from '@/store/store.js';
import global from './Global'

var baseUrl = "";
router.afterEach((to, from, next) => { //根据路由判断当前操作属于哪个模块
	if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
		
		baseUrl = global.baseUrl 
	} else {
		baseUrl = global.baseUrl 
	}
});
axios.interceptors.request.use(config => { // 这里的config包含每次请求的内容
	// 判断localStorage中是否存在api_token    + '&&token=' + store.state.token
    console.log(config.url)
	if (store.state.token) {
		//  存在将api_token写入 request header
		config.headers.common['token'] = store.state.token
	}
	return config
}, err => {
	return Promise.reject(err)
})
console.log(store.state)

axios.interceptors.response.use(response => {
	if (store.state.isLogin) {
		var uInfo = store.state.uInfo;
		uInfo.token = response.headers.token;
		sessionStorage.setItem('uInfo', JSON.stringify(uInfo));
		store.dispatch('setToken', uInfo);
	}
	return response
}, error => {
	if (error.response.data.code == 1004 || error.response.data.code == 1006) {
		ElementUI.Message({
			message: "您的凭证已过期，请重新登录！",
			type: 'error'
		})
		sessionStorage.removeItem("uInfo");
		store.dispatch('setRouter', null);
		store.dispatch('setToken', null)
		store.dispatch('currentMenu', null)
		router.push("/login")
	} else {
		return Promise.resolve(error.response)
	}
})

function checkStatus(response) {
	// 如果http状态码正常，则直接返回数据
	if (response && (response.status === 200 || response.status === 304 ||
			response.status === 400)) {
		return response.data
	}
	if (response) {
		if (response.data.code == 3000) { //判断登录是否超时，超时返回登录页面，清空登录信息
			router.push({
				path: '/login'
			})
			return {
				status: -404,
				msg: '登录超时，请重新登录'
			}
			sessionStorage.removeItem("uInfo")
		}
		if (response.data.code == 9999) { //判断登录服务是否开启，
			router.push({
				path: '/login'
			})
			return {
				status: -404,
				msg: '服务未启动，请联系系统管理员'
			}
			sessionStorage.removeItem("uInfo")
		}
		if (response.data.code == 1111) {
			return {
				status: 1111,
				msg: '登录过期'
			}
		}
	} else {
		// 异常状态下，把错误信息返回去
		return {
			status: -404,
			msg: '用户未登录'
		}
	}
}

function checkCode(res) {
	// 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
	if (res.status === -404) {
// 		ElementUI.Message({
// 			message: res.msg,
// 			type: 'error'
// 		})
	}
	if (res.data && (!res.data.success)) {

	}
	return res
}

// 请求方式的配置
export default {
	uploadImg(url, formData) {
		console.log(formData);
		return axios({
			method: 'POST',
			baseURL: baseUrl,
			url: url,
			data: formData,
			timeout: 10000,
			headers: {
				'Content-type': 'multipart/form-data'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	post(url, data) { //  post
		return axios({
			method: 'post',
			baseURL: baseUrl,
			url: url,
			params: data,
			timeout: 5000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; '
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	posts(url, data) { //  post
		console.log(data)
		return axios({
			method: 'post',
			baseURL: baseUrl,
			url: url,
			data: data,
			timeout: 50000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'deviceCode': 'A95ZEF1-47B5-AC90BF3',
				'Content-Type': 'application/json'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	puts(url, data) { //  post
		return axios({
			method: 'put',
			baseURL: baseUrl,
			url: url,
			data: data,
			timeout: 50000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'deviceCode': 'A95ZEF1-47B5-AC90BF3',
				'Content-Type': 'application/json'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	get(url, params) { // get
		return axios({
			method: 'get',
			baseURL: baseUrl,
			url: url,
			params, // get 请求时带的参数
			timeout: 30000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	put(url, params) { // get
		return axios({
			method: 'put',
			baseURL: baseUrl,
			// baseURL: baseUrl,
			url: url ,
			params:params, // get 请求时带的参数
			timeout: 5000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	delete(url, params) { // get
		return axios({
			method: 'delete',
			baseURL: baseUrl,
			// baseURL: baseUrl,
			url: url,
			params, // get 请求时带的参数
			timeout: 5000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	}
}
