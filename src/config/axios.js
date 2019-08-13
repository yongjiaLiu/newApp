/*
* axios定义
* */
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
// import store from '@/store/store.js';
import { ajaxCtx, ajaxCtx2, ajaxCtx0 } from '@/config/config.js';
// axios支持跨域cookie
axios.defaults.withCredentials = true;
// axios添加一个请求拦截器
axios.interceptors.request.use((config) => {
  if (config.url.indexOf('S0') === 0) {
    config.url = ajaxCtx0 + config.url.substring(2);
  } else if (config.url.indexOf('S2') === 0) {
    config.url = ajaxCtx2 + config.url.substring(2);
  } else if (config.url.indexOf('http') !== 0) {
    config.url = ajaxCtx + config.url;
  }
  return config;
}, (error) => {
  console.log('地址：' + error.config.url + '请求失败！');
  return Promise.reject(error);
});
// axios添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('response', response)
  let flag = false, msg = '';
  if (response && response.data) {
    if (response.data.success === false) {
      flag = true;
      msg = response.data.message;
    }
    let resCode = response.data.state;
    if (resCode === -1 || resCode === '-1') {
      flag = true;
      msg = response.data.message;
    } else if (resCode === 500 || resCode === '500') {
      flag = true;
      msg = response.data.msgInfo;
    } else if (resCode === 300 || resCode === '300') {
      // 后台session失效
      flag = true;
      msg = '登录已过期，请重新登录';
      // window.location.href = store.state.ctx + '/views/index.html';
      window.location.href = './index.html';
    }
  }
  if (flag) {
    if (msg) { ElementUI.Message({ message: msg, type: 'error' }); }
    return null;
  }
  return response;
}, function (error) {
  let errorMsg = '<span style="font-weight: bold; font-size: 13px; display: inline-block; padding-bottom: 5px;">操作失败</span><br/>' +
    '<span>请刷新页面重新操作，如果问题依旧存在，请联系管理员</span>';
  if (error && error.response && error.response.data) {
    let errorData = error.response.data;
    let mCode = errorData.code;
    if (errorData.message) { errorMsg = errorData.message; }
    // data.error
    if (errorData.error) {
      if (errorData.error.message) { errorMsg = errorData.error.message; }
      mCode = errorData.error.code;
    }
    if (mCode === '-99' || mCode === -99) {
      errorMsg = '登录已过期，请重新登录';
      window.location.href = './index.html';
    }
  }
  // 提示
  ElementUI.Message({
    message: errorMsg,
    dangerouslyUseHTMLString: true,
    type: 'error'
  });
  return Promise.reject(error);
});
Vue.prototype.axios = axios;
