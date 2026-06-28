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
  justify-content: space-around;
  gap: 4px;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 12px;
}

.nav-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

.nav-btn.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.25);
}

.nav-icon {
  font-size: 18px;
}

.nav-label {
  font-weight: 500;
}
</style>
