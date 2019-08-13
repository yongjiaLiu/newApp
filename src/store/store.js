import Vue from 'vue'
import Vuex from 'vuex'
import *as getters from './getters'
import *as mutations from './mutations'
import *as actions from './action'


Vue.use(Vuex);
const state = {
  // 登录openid
  openId: null,
	shopCar:[],
	userInfo:{}
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
