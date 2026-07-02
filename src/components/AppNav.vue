<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/trade', label: '交易', icon: '🛒' },
  { path: '/publish', label: '发布', icon: '📝' },
  { path: '/message', label: '消息', icon: '💬' },
  { path: '/user', label: '我的', icon: '👤' },
]

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="app-nav">
    <button
      v-for="item in navItems"
      :key="item.path"
      class="nav-btn"
      :class="{ active: router.currentRoute.value.path === item.path }"
      @click="navigateTo(item.path)"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 0;
  padding: 2px;
}

.nav-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 6px 10px;
  border-radius: var(--radius-full);
  transition: all var(--transition-normal);
  font-size: var(--text-xs);
  position: relative;
  white-space: nowrap;
}

.nav-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.nav-btn.active {
  color: var(--color-primary);
  background: #fff;
  box-shadow: var(--shadow-sm);
  transform: scale(1.05);
}

.nav-icon {
  font-size: 20px;
  line-height: 1;
}

.nav-label {
  font-weight: 500;
}
</style>
