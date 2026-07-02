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
  padding: var(--space-lg);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 800;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
  letter-spacing: -0.3px;
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--space-xl);
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
}

.category-card {
  border-radius: var(--radius-lg);
  padding: 28px 16px;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.category-card:nth-child(1) {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}

.category-card:nth-child(2) {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.category-card:nth-child(3) {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
}

.category-card:nth-child(4) {
  background: linear-gradient(135deg, #fef2f2, #fecaca);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.cat-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  display: grid;
  place-items: center;
  font-size: 28px;
  box-shadow: var(--shadow-sm);
}

.cat-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--text-primary);
}

.cat-desc {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.hot-section {
  margin-top: var(--space-sm);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}

.hot-section h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.placeholder-text {
  text-align: center;
  color: var(--text-muted);
  padding: var(--space-2xl) 0;
  font-size: var(--text-sm);
}
</style>
