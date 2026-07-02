<script setup lang="ts">
// 失物招领页 — 从 API 获取失物招领列表并展示
import { ref, computed, onMounted } from 'vue'
import { getLostFounds, type LostFound } from '@/api/lostFound'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()

// 失物招领列表（响应式）
const lostItems = ref<LostFound[]>([])
// 当前筛选类型
const activeTab = ref('全部')

const tabs = ['全部', '失物', '招领']

// 按类型过滤
const filteredList = computed(() => {
  if (activeTab.value === '全部') return lostItems.value
  const typeKey = activeTab.value === '失物' ? 'lost' : 'found'
  return lostItems.value.filter((item) => item.type === typeKey)
})

// 页面挂载时请求数据
onMounted(async () => {
  try {
    lostItems.value = await getLostFounds()
  } catch (err) {
    console.error('获取失物招领数据失败:', err)
  }
})

// 类型标签映射
const typeTagMap: Record<string, { text: string; tagType: 'danger' | 'success' }> = {
  lost: { text: '失物', tagType: 'danger' },
  found: { text: '招领', tagType: 'success' },
}
</script>

<template>
  <section class="lost-found">
    <h2 class="section-title">🔍 失物招领</h2>
    <p class="section-desc">丢失物品来这里找，捡到物品来这里发布</p>

    <!-- 类型切换 -->
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

    <!-- 信息列表 -->
    <div v-if="filteredList.length > 0" class="item-list">
      <ItemCard
        v-for="item in filteredList"
        :key="item.id"
        :title="item.title"
        :tag="typeTagMap[item.type]?.text || item.type"
        :tag-type="typeTagMap[item.type]?.tagType || 'primary'"
        :meta="[`📍 ${item.location}`, `🕐 ${item.time}`, `📞 ${item.contact}`]"
      >
        <template #footer>
          <button
            class="favorite-btn"
            @click="favoriteStore.toggleFavorite({
              id: item.id,
              type: 'lostFound',
              title: item.title,
              description: item.description || '',
              location: item.location
            })"
          >
            {{ favoriteStore.isFavorite('lostFound', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      message="暂无失物招领信息"
      icon="🔍"
    />
  </section>
</template>

<style scoped>
.lost-found {
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

.item-list {
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
