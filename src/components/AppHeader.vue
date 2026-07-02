<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="brand">
      <span class="logo">校园轻集市</span>
      <span class="slogan">轻量、可信、面向校园生活</span>
    </div>

    <slot />

    <div class="user-actions">
      <template v-if="userStore.isLoggedIn">
        <RouterLink to="/user" class="user-link">{{ userStore.displayName }}</RouterLink>
        <button type="button" class="logout-btn" @click="handleLogout">退出</button>
      </template>

      <template v-else>
        <RouterLink to="/login" class="auth-link">登录</RouterLink>
        <RouterLink to="/register" class="auth-link register-link">注册</RouterLink>
      </template>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 68px;
  padding: 0 var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
}

.logo {
  font-size: var(--text-xl);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.slogan {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.75);
  font-weight: 400;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-sm);
}

.user-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: opacity var(--transition-fast);
}

.user-link:hover {
  opacity: 0.85;
}

.auth-link {
  color: #fff;
  text-decoration: none;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  font-weight: 500;
}

.auth-link:hover {
  background: rgba(255, 255, 255, 0.15);
}

.register-link {
  background: rgba(255, 255, 255, 0.2);
}

.register-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

.logout-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 6px 14px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}
</style>
