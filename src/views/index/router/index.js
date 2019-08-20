import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/components/main.vue'
import mainDefault from '@/views/index/components/default.vue' //首页
import Auth from '@/views/index/components/auth.vue'

import Mine from '@/views/index/components/mine/index.vue' //个人中心
import Active from '@/views/index/components/active/index.vue' //活动


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/main',
      component: main,
      children: [{
        path: '',
        component: mainDefault
      }]
    }, {
      path: '/',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: '/default',
      children: [{
        path: '/default',
        name: 'default',
        component: mainDefault
      }, {
        path: '/mine',
        name: 'mine',
        component: Mine
      }, {
        path: '/active',
        name: 'active',
        component: Active
      }]
    }
  ]
})
