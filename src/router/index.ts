import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useUserStore } from '@/stores/user'

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
      meta: { title: '发布信息', requiresAuth: true },
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/MessageView.vue'),
      meta: { title: '消息', requiresAuth: true },
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
      meta: { title: '个人中心', requiresAuth: true },
    },
  ],
})

// 全局导航守卫 - 登录检查
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 如果目标路由需要登录
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    if (!userStore.isLoggedIn) {
      // 未登录，弹出提示并跳转到登录页
      window.alert('请先登录账号后再进行此操作')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  next()
})

export default router
