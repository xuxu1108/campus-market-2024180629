<script setup lang="ts">
// 详情页 — 商品详细信息，通过路由参数获取 id
import { useRoute } from 'vue-router'

const route = useRoute()
const goodsId = route.params.id as string
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

    <button class="btn-buy">立即购买</button>
    <button class="btn-cart">加入购物车</button>
  </section>
</template>

<style scoped>
.detail {
  padding: var(--space-lg);
}
.detail h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}
.detail-card {
  display: flex;
  gap: var(--space-lg);
  margin: var(--space-lg) 0;
  padding: var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.detail-image {
  width: 160px;
  height: 160px;
  background: linear-gradient(135deg, var(--color-primary-bg), var(--color-border-light));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  border-radius: var(--radius-md);
  font-size: 48px;
  flex-shrink: 0;
}
.detail-info {
  flex: 1;
}
.detail-info h3 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}
.detail-price {
  font-size: var(--text-2xl);
  color: var(--color-danger);
  font-weight: 800;
  letter-spacing: -0.5px;
}
.detail-desc {
  color: var(--text-secondary);
  margin: 8px 0;
  font-size: var(--text-sm);
  line-height: 1.6;
}
.detail-seller {
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.btn-buy,
.btn-cart {
  margin: 8px 8px 0 0;
  padding: 10px 24px;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--transition-fast);
}
.btn-buy {
  background: linear-gradient(135deg, var(--color-danger), #dc2626);
  color: #fff;
}
.btn-buy:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-cart {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
}
.btn-cart:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
</style>
