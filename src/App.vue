<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/list', label: '列表', icon: '📋' },
  { path: '/publish', label: '发布', icon: '📝' },
  { path: '/messages', label: '消息', icon: '💬' },
  { path: '/profile', label: '我的', icon: '👤' },
]

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="app-wrapper">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <h1 class="app-title">校园轻集市</h1>
      <nav class="nav-bar">
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
    </header>

    <!-- 页面内容区 -->
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
  color: #333;
}
</style>

<style scoped>
.app-wrapper {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.app-header {
  background: #409eff;
  color: #fff;
  padding: 16px 16px 12px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.app-title {
  font-size: 18px;
  text-align: center;
  margin-bottom: 12px;
}

.nav-bar {
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

/* 内容区 */
.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
