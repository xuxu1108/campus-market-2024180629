<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTrades, type Trade } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore } from '@/stores/favorite'

const router = useRouter()
const favoriteStore = useFavoriteStore()

const goodsList = ref<Trade[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')
const activeFilter = ref('全部')

const categories = ['全部', '教材', '数码', '生活', '出行']

const filteredList = computed(() => {
  const value = keyword.value.trim()

  let list = goodsList.value

  if (activeFilter.value !== '全部') {
    list = list.filter((item) => item.category === activeFilter.value)
  }

  if (value) {
    list = list.filter((item) => {
      return (
        item.title.includes(value) ||
        item.category.includes(value) ||
        item.location.includes(value) ||
        (item.description && item.description.includes(value))
      )
    })
  }

  return list
})

async function loadTrades() {
  loading.value = true
  error.value = false

  try {
    goodsList.value = await getTrades()
  } catch (err) {
    console.error('获取二手交易数据失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTrades()
})

const goDetail = (id: number) => {
  router.push(`/detail/${id}`)
}

const statusTagMap: Record<string, { text: string; type: 'success' | 'warning' | 'primary' }> = {
  open: { text: '在售', type: 'success' },
  closed: { text: '已售', type: 'warning' },
  done: { text: '完成', type: 'primary' },
}
</script>

<template>
  <section class="trade">
    <h2 class="section-title">🛒 二手交易</h2>
    <p class="section-desc">发现身边的二手好物，物尽其用</p>

    <!-- 搜索栏 -->
    <SearchBar
      v-model="keyword"
      placeholder="搜索商品标题、分类、地点或描述"
    />

    <!-- 分类筛选 -->
    <div class="filters">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-btn"
        :class="{ active: activeFilter === cat }"
        @click="activeFilter = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- 加载状态 -->
    <LoadingState
      v-if="loading"
      text="正在加载二手交易信息..."
    />

    <!-- 错误状态 -->
    <ErrorState
      v-else-if="error"
      message="二手交易数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadTrades"
    />

    <!-- 空状态 -->
    <EmptyState
      v-else-if="filteredList.length === 0"
      message="暂无符合条件的二手交易信息"
      icon="🛒"
    />

    <!-- 商品列表 -->
    <div v-else class="goods-list">
      <ItemCard
        v-for="item in filteredList"
        :key="item.id"
        :title="item.title"
        :tag="statusTagMap[item.status]?.text || item.status"
        :tag-type="statusTagMap[item.status]?.type || 'primary'"
        :price="`¥${item.price}`"
        :meta="[`📍 ${item.location}`, `🕐 ${item.publishTime}`, `${item.condition}`]"
        :clickable="true"
        @click="goDetail(item.id)"
      >
        <template #footer>
          <button
            class="favorite-btn"
            :class="{ active: favoriteStore.isFavorite('trade', item.id) }"
            @click="favoriteStore.toggleFavorite({
              id: item.id,
              type: 'trade',
              title: item.title,
              description: item.description || '',
              location: item.location
            })"
          >
            {{ favoriteStore.isFavorite('trade', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<style scoped>
.trade {
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

.filters {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.filter-btn {
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

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-bg);
}

.filter-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.filter-btn:active {
  transform: scale(0.97);
}

.goods-list {
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

.favorite-btn.active {
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-weight: 600;
}
</style>
