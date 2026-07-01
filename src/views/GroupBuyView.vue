<script setup lang="ts">
// 拼单搭子页 — 从 API 获取拼单列表并展示
import { ref, computed, onMounted } from 'vue'
import { getGroupBuys, type GroupBuy } from '@/api/groupBuy'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()

// 拼单列表（响应式）
const groupList = ref<GroupBuy[]>([])
// 当前筛选类型
const activeTab = ref('全部')

const tabs = ['全部', '拼单', '搭子', '组队']

// 按类型过滤
const filteredList = computed(() => {
  if (activeTab.value === '全部') return groupList.value
  return groupList.value.filter((item) => item.type === activeTab.value)
})

// 页面挂载时请求数据
onMounted(async () => {
  try {
    groupList.value = await getGroupBuys()
  } catch (err) {
    console.error('获取拼单搭子数据失败:', err)
  }
})

// 状态标签映射
const statusTagMap: Record<string, { text: string; type: 'success' | 'warning' | 'primary' }> = {
  open: { text: '进行中', type: 'success' },
  closed: { text: '已截止', type: 'warning' },
  done: { text: '已完成', type: 'primary' },
}
</script>

<template>
  <section class="group-buy">
    <h2 class="section-title">👥 拼单搭子</h2>
    <p class="section-desc">找人一起拼、一起学、一起玩</p>

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

    <!-- 拼单列表 -->
    <div v-if="filteredList.length > 0" class="group-list">
      <ItemCard
        v-for="item in filteredList"
        :key="item.id"
        :title="item.title"
        :tag="item.type"
        :tag-type="'primary'"
        :price="`${item.currentCount}/${item.targetCount}人`"
        :meta="[`📍 ${item.location}`, `⏰ ${item.deadline}`, `👤 ${item.publisher}`]"
      >
        <template #footer>
          <button
            class="favorite-btn"
            @click="favoriteStore.toggleFavorite({
              id: item.id,
              type: 'groupBuy',
              title: item.title,
              description: item.description || '',
              location: item.location
            })"
          >
            {{ favoriteStore.isFavorite('groupBuy', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      message="暂无拼单信息"
      icon="👥"
    />
  </section>
</template>

<style scoped>
.group-buy {
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

.group-list {
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
