import Vue from 'vue'
import VueRouter from 'vue-router'
import ChannelInstall from '../channel/channel_install.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'channel_install',
    component: ChannelInstall
  }
]

const router = new VueRouter({
  routes
})

export default router
