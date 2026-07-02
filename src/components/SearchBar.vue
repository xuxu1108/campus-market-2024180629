<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      @input="handleInput"
    />

    <button
      v-if="modelValue"
      type="button"
      class="clear-btn"
      @click="$emit('update:modelValue', '')"
    >
      清空
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: '请输入关键词搜索',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 20px 24px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
}

.search-icon {
  font-size: 18px;
  flex-shrink: 0;
  opacity: 0.5;
}

.search-bar input {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 12px 20px;
  font-size: var(--text-base);
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: var(--color-bg);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-bar input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
}

.search-bar input::placeholder {
  color: var(--text-muted);
}

.clear-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 10px 18px;
  cursor: pointer;
  background: var(--color-border-light);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.clear-btn:hover {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}
</style>
