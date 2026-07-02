<template>
  <div class="loading-state">
    <div class="spinner"></div>
    <p>{{ text || '正在加载数据...' }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<style scoped>
.loading-state {
  padding: 48px var(--space-xl);
  text-align: center;
  color: var(--text-secondary);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.spinner {
  width: 36px;
  height: 36px;
  margin: 0 auto 16px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  box-shadow: 0 0 16px rgba(79, 70, 229, 0.12);
}

.loading-state p {
  margin: 0;
  font-size: var(--text-sm);
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
