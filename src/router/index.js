import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Users from '../views/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      // 写在home内部
      children: [{
        path: 'users',
        name: 'users',
        component: Users
      }]
    }
  ]
})
