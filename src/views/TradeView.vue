<script setup lang="ts">
// 二手交易页 — 从 API 获取商品列表并展示
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTrades, type Trade } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'

const router = useRouter()
const favoriteStore = useFavoriteStore()

// 商品列表（响应式）
const goodsList = ref<Trade[]>([])
// 当前筛选分类
const activeFilter = ref('全部')

const categories = ['全部', '教材', '数码', '生活', '出行']

// 按分类过滤
const filteredList = computed(() => {
  if (activeFilter.value === '全部') return goodsList.value
  return goodsList.value.filter((item) => item.category === activeFilter.value)
})

// 页面挂载时请求数据
onMounted(async () => {
  try {
    goodsList.value = await getTrades()
  } catch (err) {
    console.error('获取二手交易数据失败:', err)
  }
})

const goDetail = (id: number) => {
  router.push(`/detail/${id}`)
}

// 状态标签映射
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

    <!-- 商品列表 -->
    <div v-if="filteredList.length > 0" class="goods-list">
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

    <!-- 空状态 -->
    <EmptyState
      v-else
      message="暂无商品信息"
      icon="🛒"
    />
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

.favorite-btn:hover {
  background: #fee2e2;
  color: #e74c3c;
}
</style>
