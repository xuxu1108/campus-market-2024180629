<script setup lang="ts">
// 二手交易页 — 展示二手商品列表
import { useRouter } from 'vue-router'

const router = useRouter()

const goDetail = (id: number) => {
  router.push(`/detail/${id}`)
}

// 静态示例数据
const goodsList = [
  { id: 1, title: '高等数学（第七版）', price: 15, category: '教材' },
  { id: 2, title: '机械键盘 Cherry MX', price: 120, category: '数码' },
  { id: 3, title: '宿舍用加湿器', price: 30, category: '生活' },
  { id: 4, title: '二手自行车 26寸', price: 200, category: '出行' },
]
</script>

<template>
  <section class="trade">
    <h2 class="section-title">🛒 二手交易</h2>
    <p class="section-desc">发现身边的二手好物，物尽其用</p>

    <!-- 分类筛选 -->
    <div class="filters">
      <button class="filter-btn active">全部</button>
      <button class="filter-btn">教材</button>
      <button class="filter-btn">数码</button>
      <button class="filter-btn">生活</button>
      <button class="filter-btn">出行</button>
    </div>

    <!-- 商品列表 -->
    <ul class="goods-list">
      <li
        v-for="item in goodsList"
        :key="item.id"
        class="goods-item"
        @click="goDetail(item.id)"
      >
        <div class="goods-info">
          <span class="goods-title">{{ item.title }}</span>
          <span class="goods-category">{{ item.category }}</span>
        </div>
        <span class="goods-price">¥{{ item.price }}</span>
      </li>
    </ul>

    <p v-if="goodsList.length === 0" class="empty-tip">暂无商品</p>
  </section>
</template>

<style scoped>
.trade {
  padding: 16px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 4px;
}

.section-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

.filter-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.filter-btn.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.goods-list {
  list-style: none;
  padding: 0;
}

.goods-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.goods-item:hover {
  background: #f5f7fa;
}

.goods-title {
  font-size: 15px;
  font-weight: 500;
}

.goods-category {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.goods-price {
  color: #e74c3c;
  font-weight: 600;
}

.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 40px;
}
</style>
