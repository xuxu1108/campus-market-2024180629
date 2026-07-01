<script setup lang="ts">
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
  <header class="app-header">
    <div class="brand">
      <span class="logo">校园轻集市</span>
      <span class="slogan">轻量、可信、面向校园生活</span>
    </div>

    <slot />

    <div class="user-mini">
      <span>{{ userStore.displayName }}</span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #409eff;
  color: #fff;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.slogan {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.user-mini {
  font-size: 14px;
  color: #fff;
}
</style>
