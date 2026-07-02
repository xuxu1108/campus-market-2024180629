<script setup lang="ts">
// 详情页 — 商品详细信息，通过路由参数获取 id
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const goodsId = route.params.id as string

function handleBuy() {
  if (!userStore.isLoggedIn) {
    window.alert('请先登录账号后再进行购买操作')
    router.push('/login')
    return
  }
  // 后续购买逻辑
  window.alert('购买功能开发中...')
}

function handleAddCart() {
  if (!userStore.isLoggedIn) {
    window.alert('请先登录账号后再进行此操作')
    router.push('/login')
    return
  }
  // 后续加入购物车逻辑
  window.alert('加入购物车功能开发中...')
}
</script>

<template>
  <section class="detail">
    <h2>📦 商品详情</h2>
    <p>当前商品 ID：<strong>{{ goodsId }}</strong></p>

    <div class="detail-card">
      <div class="detail-image">[商品图片占位]</div>
      <div class="detail-info">
        <h3>商品名称示例</h3>
        <p class="detail-price">¥ --</p>
        <p class="detail-desc">这里是商品描述信息，后续对接 API 后动态加载。</p>
        <p class="detail-seller">卖家：--</p>
      </div>
    </div>

    <button class="btn-buy" @click="handleBuy">立即购买</button>
    <button class="btn-cart" @click="handleAddCart">加入购物车</button>
  </section>
</template>

<style scoped>
.detail {
  padding: 0;
}
.detail h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}
.detail-card {
  display: flex;
  gap: 32px;
  margin: 24px 0;
  padding: 32px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.detail-image {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, var(--color-primary-bg), var(--color-border-light));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  border-radius: var(--radius-md);
  font-size: 72px;
  flex-shrink: 0;
}
.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.detail-info h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.detail-price {
  font-size: 32px;
  color: var(--color-danger);
  font-weight: 800;
  letter-spacing: -0.5px;
}
.detail-desc {
  color: var(--text-secondary);
  margin: 8px 0;
  font-size: var(--text-base);
  line-height: 1.6;
}
.detail-seller {
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin-top: auto;
}
.btn-buy,
.btn-cart {
  margin: 8px 12px 0 0;
  padding: 12px 32px;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: 600;
  transition: all var(--transition-fast);
}
.btn-buy {
  background: linear-gradient(135deg, var(--color-danger), #dc2626);
  color: #fff;
}
.btn-buy:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.btn-cart {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
}
.btn-cart:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
</style>
