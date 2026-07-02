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
  font-size: 20px;
  margin-bottom: 4px;
}

.section-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

.filter-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.filter-btn.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.goods-list {
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

.favorite-btn.active {
  background: #dbeafe;
  color: #2563eb;
}
</style>
