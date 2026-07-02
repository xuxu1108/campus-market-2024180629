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
  padding: 0;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--text-base);
  margin-bottom: 24px;
}

.tab-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 8px 20px;
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

.group-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.favorite-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 8px 16px;
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
