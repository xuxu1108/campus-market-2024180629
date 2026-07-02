<script setup lang="ts">
// 通用列表卡片组件 — 可被二手交易、失物招领、拼单搭子、跑腿委托等页面复用
defineProps<{
  // 卡片标题
  title: string
  // 左侧标签文字（如"失物""拼单"等）
  tag?: string
  // 标签颜色主题
  tagType?: 'primary' | 'danger' | 'success' | 'warning'
  // 右侧价格/酬劳展示
  price?: string
  // 描述文字
  description?: string
  // 地点
  location?: string
  // 底部信息行
  meta?: string[]
  // 是否可点击
  clickable?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="item-card"
    :class="[
      { 'is-clickable': clickable },
      `accent-${tagType || 'primary'}`,
    ]"
    @click="$emit('click')"
  >
    <div class="card-header">
      <div class="card-left">
        <span
          v-if="tag"
          class="card-tag"
          :class="`tag-${tagType || 'primary'}`"
        >
          {{ tag }}
        </span>
        <span class="card-title">{{ title }}</span>
      </div>
      <span v-if="price" class="card-price">{{ price }}</span>
    </div>
    <div v-if="description || location" class="card-desc">
      <span v-if="location">📍 {{ location }}</span>
      <span v-if="description">{{ description }}</span>
    </div>
    <div v-if="meta && meta.length > 0" class="card-meta">
      <span v-for="(item, index) in meta" :key="index">{{ item }}</span>
    </div>
    <div v-if="$slots.footer" class="card-footer" @click.stop>
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.item-card {
  padding: 14px var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-md);
  border-left: 3px solid transparent;
  transition: all var(--transition-normal);
}

.item-card.accent-primary {
  border-left-color: var(--color-primary);
}

.item-card.accent-danger {
  border-left-color: var(--color-danger);
}

.item-card.accent-success {
  border-left-color: var(--color-success);
}

.item-card.accent-warning {
  border-left-color: var(--color-warning);
}

.item-card.is-clickable {
  cursor: pointer;
}

.item-card.is-clickable:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.card-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.card-tag {
  font-size: var(--text-xs);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.01em;
}

.tag-primary {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.tag-danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.tag-success {
  background: var(--color-success-bg);
  color: #059669;
}

.tag-warning {
  background: var(--color-warning-bg);
  color: #d97706;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-price {
  font-size: var(--text-lg);
  font-weight: 800;
  color: var(--color-danger);
  white-space: nowrap;
  flex-shrink: 0;
}

.card-desc {
  display: flex;
  gap: var(--space-md);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.card-meta {
  display: flex;
  gap: var(--space-lg);
  font-size: var(--text-xs);
  color: var(--text-muted);
  flex-wrap: wrap;
}

.card-footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
</style>
