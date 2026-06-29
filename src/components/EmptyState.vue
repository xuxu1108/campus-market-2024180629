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
    <div class="empty-icon">{{ icon || '📭' }}</div>
    <p class="empty-message">{{ message || '暂无数据' }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-message {
  color: #999;
  font-size: 14px;
}
</style>
