<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppNav from './AppNav.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- 顶部区域：标题 + 导航 -->
    <AppHeader>
      <AppNav />
    </AppHeader>

    <!-- 页面内容区 -->
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
