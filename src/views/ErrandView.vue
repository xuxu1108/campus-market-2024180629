<script setup lang="ts">
// 跑腿委托页 — 从 API 获取跑腿任务列表并展示
import { ref, computed, onMounted } from 'vue'
import { getErrands, type Errand } from '@/api/errand'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'

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
      />
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

.errand-list {
  list-style: none;
  padding: 0;
}
</style>
