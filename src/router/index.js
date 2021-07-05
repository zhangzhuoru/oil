import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../channel/main.vue'
import Login from '../channel/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  //如果用户访问的登录页，直接放行
  if(to.path === '/login') return next()
  //从sessionStorage中获取到保存的token值
   const tokenStr = window.sessionStorage.getItem('token')
  //没有token，强制跳转到登录页
  if(!tokenStr) return next('/login')
  next()
})

export default router
