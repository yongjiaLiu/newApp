/*
 * Action 类似于 mutation，不同在于：
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 *
 * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
 * 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
 *  actions: {
 *    increment (context) {
 *      context.commit('increment')
 *    }
 *  }
 *  我们会经常会用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
 *  actions: {
 *    increment ({ commit }) { //{ dispatch, commit, state, getters }
 *        commit('increment')
 *    }
 * }
 *
 * Action 通过 store.dispatch 方法触发：
 * store.dispatch('increment')
 *
 * */
export const openId = ({commit},user) => {
	commit("setOpenId",user)
}

export const actShopCar = ({commit},user) => {
	commit("setCar",user)
}


export const actUserInfo = ({commit},user) => {
	commit("setUserInfo",user)
}