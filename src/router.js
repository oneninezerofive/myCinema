import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Cinema from './views/Cinema'

import Search from './views/search.vue'
import CityList from "./components/cityList.vue"
import Show from "./views/show.vue"
import MyOrder from "./views/myOrder.vue"
Vue.use(Router)

var router = new Router({
  routes: [{
      path: '/mine',
      name: 'mine',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Mine.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Reg.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
    }, {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/Cinema',
      name: 'Cinema',
      component: Cinema,
    },
    {
      path: '/myrim',
      name: 'myrim',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Myrim.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/citylist',
      name: 'citylist',
      component: CityList
    }, {
      path: '/show',
      name: 'show',
      component: Show
    }, {
      path: '/myorder',
      name: 'myorder',
      component: MyOrder
    }
  ]
})
router.beforeEach(function (to, from, next) {
  let falg = router.app.$options.store.getters.getLogin;
  // console.log(falg);
  if (falg == 'y_login' || to.path === '/' || to.path === '/Cinema') {
    //如果用户信息存在则往下执行。
    next();
  } else if (to.path === '/mine' || to.path === '/myorder' || to.path === '/show') {
    next({
      path: '/login'
    })
  } else {
    next();
  }

});
export default router;