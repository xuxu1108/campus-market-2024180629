<template>
  <div class="error-state">
    <div class="error-icon-circle">⚠️</div>
    <h3>加载失败</h3>
    <p>{{ message }}</p>
    <button v-if="showRetry" type="button" @click="$emit('retry')">
      重新加载
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  showRetry?: boolean
}>()

defineEmits<{
  retry: []
}>()
</script>

<style scoped>
.error-state {
  padding: 48px var(--space-xl);
  text-align: center;
  color: var(--color-danger);
  background: var(--color-danger-bg);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  animation: fadeIn 0.3s ease;
}

.error-icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
  display: grid;
  place-items: center;
  font-size: 28px;
  margin: 0 auto 16px;
}

.error-state h3 {
  margin: 0 0 8px;
  font-size: var(--text-lg);
  font-weight: 600;
}

.error-state p {
  margin: 0 0 20px;
  font-size: var(--text-sm);
  opacity: 0.85;
}

.error-state button {
  border: none;
  border-radius: var(--radius-full);
  padding: 10px 20px;
  cursor: pointer;
  background: var(--color-danger);
  color: #fff;
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.error-state button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.error-state button:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
