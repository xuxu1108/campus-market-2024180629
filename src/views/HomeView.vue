<script setup lang="ts">
// 首页 — 平台入口、业务分类、推荐信息
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  { name: '二手交易', icon: '🛒', desc: '买卖闲置好物', path: '/trade' },
  { name: '失物招领', icon: '🔍', desc: '找回遗失物品', path: '/lost-found' },
  { name: '拼单搭子', icon: '👥', desc: '找人一起拼', path: '/group-buy' },
  { name: '跑腿委托', icon: '🏃', desc: '代办日常事务', path: '/errand' },
]

const goTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <section class="home">
    <h2 class="section-title">🏠 首页</h2>
    <p class="section-desc">校园轻集市 — 你的校园生活服务平台</p>

    <!-- 业务分类入口 -->
    <div class="category-grid">
      <div
        v-for="cat in categories"
        :key="cat.name"
        class="category-card"
        @click="goTo(cat.path)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-desc">{{ cat.desc }}</span>
      </div>
    </div>

    <!-- 推荐信息 -->
    <div class="hot-section">
      <h3>🔥 热门推荐</h3>
      <p class="placeholder-text">暂无数据，敬请期待…</p>
    </div>
  </section>
</template>

<style scoped>
.home {
  padding: 16px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 4px;
}

.section-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.category-card {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.category-card:hover {
  background: #e8f4fd;
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 32px;
}

.cat-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.cat-desc {
  font-size: 12px;
  color: #999;
}

.hot-section {
  margin-top: 8px;
}

.hot-section h3 {
  font-size: 16px;
  margin-bottom: 12px;
}

.placeholder-text {
  text-align: center;
  color: #999;
  padding: 24px 0;
}
</style>
