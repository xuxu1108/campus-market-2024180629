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
    :class="{ 'is-clickable': clickable }"
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
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
}

.item-card.is-clickable {
  cursor: pointer;
}

.item-card.is-clickable:hover {
  background: #f5f7fa;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.card-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag-primary {
  background: #e8f4fd;
  color: #409eff;
}

.tag-danger {
  background: #fef0f0;
  color: #e74c3c;
}

.tag-success {
  background: #f0f9eb;
  color: #67c23a;
}

.tag-warning {
  background: #fdf6ec;
  color: #e6a23c;
}

.card-title {
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-price {
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
  white-space: nowrap;
  flex-shrink: 0;
}

.card-desc {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}

.card-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
  flex-wrap: wrap;
}

.card-footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
