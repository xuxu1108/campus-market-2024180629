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
  padding: 20px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: 0;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.item-card.accent-primary {
  border-top: 3px solid var(--color-primary);
}

.item-card.accent-danger {
  border-top: 3px solid var(--color-danger);
}

.item-card.accent-success {
  border-top: 3px solid var(--color-success);
}

.item-card.accent-warning {
  border-top: 3px solid var(--color-warning);
}

.item-card.is-clickable {
  cursor: pointer;
}

.item-card.is-clickable:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--color-border);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-md);
  gap: 12px;
}

.card-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.card-tag {
  font-size: var(--text-xs);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.01em;
  align-self: flex-start;
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
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

.card-price {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-danger);
  white-space: nowrap;
  flex-shrink: 0;
}

.card-desc {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: 12px;
  flex: 1;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  font-size: var(--text-xs);
  color: var(--text-muted);
  padding-top: 12px;
  border-top: 1px solid var(--color-border-light);
}

.card-footer {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-top: 12px;
  border-top: 1px solid var(--color-border-light);
}
</style>
