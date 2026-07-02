<script setup lang="ts">
// 跑腿委托页 — 从 API 获取跑腿任务列表并展示
import { ref, computed, onMounted } from 'vue'
import { getErrands, type Errand } from '@/api/errand'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()

// 跑腿任务列表（响应式）
const errandList = ref<Errand[]>([])
// 当前筛选类型
const activeTab = ref('全部')

const tabs = ['全部', '委托', '跑腿']

// 按类型过滤
const filteredList = computed(() => {
  if (activeTab.value === '全部') return errandList.value
  return errandList.value.filter((item) => item.taskType === activeTab.value)
})

// 页面挂载时请求数据
onMounted(async () => {
  try {
    errandList.value = await getErrands()
  } catch (err) {
    console.error('获取跑腿委托数据失败:', err)
  }
})

// 任务类型标签映射
const taskTypeTagMap: Record<string, { text: string; tagType: 'danger' | 'success' }> = {
  '委托': { text: '委托', tagType: 'danger' },
  '跑腿': { text: '跑腿', tagType: 'success' },
}
</script>

<template>
  <section class="errand">
    <h2 class="section-title">🏃 跑腿委托</h2>
    <p class="section-desc">发布跑腿任务，或者接单赚零花钱</p>

    <!-- 类型筛选 -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab-btn"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- 任务列表 -->
    <div v-if="filteredList.length > 0" class="errand-list">
      <ItemCard
        v-for="item in filteredList"
        :key="item.id"
        :title="item.title"
        :tag="taskTypeTagMap[item.taskType]?.text || item.taskType"
        :tag-type="taskTypeTagMap[item.taskType]?.tagType || 'primary'"
        :price="`¥${item.reward}`"
        :meta="[`📍 ${item.pickupLocation} → ${item.deliveryLocation}`, `⏰ ${item.deadline}`, `👤 ${item.publisher}`]"
      >
        <template #footer>
          <button
            class="favorite-btn"
            @click="favoriteStore.toggleFavorite({
              id: item.id,
              type: 'errand',
              title: item.title,
              description: item.description || '',
              location: item.pickupLocation
            })"
          >
            {{ favoriteStore.isFavorite('errand', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      message="暂无跑腿任务"
      icon="🏃"
    />
  </section>
</template>

<style scoped>
.errand {
  padding: 16px;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--space-lg);
}

.tab-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab-btn {
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-bg);
}

.tab-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.tab-btn:active {
  transform: scale(0.97);
}

.errand-list {
  list-style: none;
  padding: 0;
}

.favorite-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 6px 14px;
  cursor: pointer;
  background: var(--color-border-light);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.favorite-btn:hover {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}
</style>
