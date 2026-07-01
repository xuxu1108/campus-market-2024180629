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
  font-size: 20px;
  margin-bottom: 4px;
}

.section-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.tab-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

.tab-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.tab-btn.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.item-list {
  list-style: none;
  padding: 0;
}

.favorite-btn {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
  font-size: 13px;
}

.favorite-btn:hover {
  background: #fee2e2;
  color: #e74c3c;
}
</style>
