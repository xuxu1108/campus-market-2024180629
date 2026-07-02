<script setup lang="ts">
// 空状态组件 — 当列表数据为空时展示
defineProps<{
  // 提示文字
  message?: string
  // 图标（emoji 或文字）
  icon?: string
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon-circle">
      <span class="empty-icon">{{ icon || '📭' }}</span>
    </div>
    <p class="empty-message">{{ message || '暂无数据' }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px var(--space-xl);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--color-border);
}

.empty-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary-bg);
  display: grid;
  place-items: center;
  margin-bottom: var(--space-lg);
}

.empty-icon {
  font-size: 36px;
  line-height: 1;
}

.empty-message {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin: 0;
}
</style>
