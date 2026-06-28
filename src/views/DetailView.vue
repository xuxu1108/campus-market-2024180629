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
  padding: 16px;
}
.detail-card {
  display: flex;
  gap: 16px;
  margin: 16px 0;
}
.detail-image {
  width: 160px;
  height: 160px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border-radius: 8px;
}
.detail-info {
  flex: 1;
}
.detail-price {
  font-size: 24px;
  color: #e74c3c;
  font-weight: 700;
}
.detail-desc {
  color: #666;
  margin: 8px 0;
}
.detail-seller {
  color: #999;
  font-size: 14px;
}
.btn-buy,
.btn-cart {
  margin: 8px 8px 0 0;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-buy {
  background: #e74c3c;
  color: #fff;
}
.btn-cart {
  background: #409eff;
  color: #fff;
}
</style>
