<script setup lang="ts">
// 列表页 — 商品列表、分类筛选、排序
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
]
</script>

<template>
  <section class="list">
    <h2>📋 商品列表</h2>

    <!-- 分类筛选 -->
    <div class="filters">
      <button>全部</button>
      <button>教材</button>
      <button>数码</button>
      <button>生活</button>
      <button>其他</button>
    </div>

    <!-- 商品列表 -->
    <ul class="goods-list">
      <li v-for="item in goodsList" :key="item.id" class="goods-item" @click="goDetail(item.id)">
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
.list {
  padding: 16px;
}
.filters {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}
.filters button {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.filters button:hover {
  border-color: #409eff;
  color: #409eff;
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
