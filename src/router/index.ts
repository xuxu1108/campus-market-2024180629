import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },
    {
      path: '/trade',
      name: 'trade',
      component: () => import('@/views/TradeView.vue'),
      meta: { title: '二手交易' },
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
      meta: { title: '商品详情' },
    },
    {
      path: '/lost-found',
      name: 'lost-found',
      component: () => import('@/views/LostFoundView.vue'),
      meta: { title: '失物招领' },
    },
    {
      path: '/group-buy',
      name: 'group-buy',
      component: () => import('@/views/GroupBuyView.vue'),
      meta: { title: '拼单搭子' },
    },
    {
      path: '/errand',
      name: 'errand',
      component: () => import('@/views/ErrandView.vue'),
      meta: { title: '跑腿委托' },
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/PublishView.vue'),
      meta: { title: '发布信息' },
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/MessageView.vue'),
      meta: { title: '消息' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: '登录' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: '注册' },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserCenterView.vue'),
      meta: { title: '个人中心' },
    },
  ],
})

export default router
