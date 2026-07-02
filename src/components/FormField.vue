<template>
  <label class="form-field" :class="{ 'has-error': error }">
    <span class="label">
      {{ label }}
      <em v-if="required">*</em>
    </span>

    <slot />

    <transition name="error-fade">
      <span v-if="error" class="error">⚠ {{ error }}</span>
    </transition>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: padding-left var(--transition-fast);
}

.form-field.has-error {
  border-left: 3px solid var(--color-danger);
  padding-left: var(--space-md);
}

.label {
  font-size: var(--text-sm);
  color: var(--text-primary);
  font-weight: 600;
}

.label em {
  color: var(--color-danger);
  font-style: normal;
  margin-left: 2px;
}

.error {
  color: var(--color-danger);
  font-size: var(--text-xs);
  font-weight: 500;
}

.error-fade-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.error-fade-leave-active {
  transition: opacity 0.15s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.error-fade-leave-to {
  opacity: 0;
}
</style>
