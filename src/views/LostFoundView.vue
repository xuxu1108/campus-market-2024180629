<script setup lang="ts">
// 失物招领页 — 展示失物和招领信息
const lostItems = [
  { id: 1, title: '蓝色保温杯', location: '图书馆二楼', time: '2026-06-27', type: '失物' },
  { id: 2, title: '校园卡（张三）', location: '一食堂门口', time: '2026-06-26', type: '失物' },
  { id: 3, title: '黑色双肩包', location: '教学楼A201', time: '2026-06-25', type: '招领' },
  { id: 4, title: '钥匙串（3把钥匙）', location: '操场跑道旁', time: '2026-06-24', type: '招领' },
]
</script>

<template>
  <section class="lost-found">
    <h2 class="section-title">🔍 失物招领</h2>
    <p class="section-desc">丢失物品来这里找，捡到物品来这里发布</p>

    <!-- 类型切换 -->
    <div class="tab-bar">
      <button class="tab-btn active">全部</button>
      <button class="tab-btn">失物</button>
      <button class="tab-btn">招领</button>
    </div>

    <!-- 信息列表 -->
    <ul class="item-list">
      <li v-for="item in lostItems" :key="item.id" class="item-card">
        <div class="item-header">
          <span class="item-tag" :class="item.type === '失物' ? 'tag-lost' : 'tag-found'">
            {{ item.type }}
          </span>
          <span class="item-title">{{ item.title }}</span>
        </div>
        <div class="item-meta">
          <span>📍 {{ item.location }}</span>
          <span>🕐 {{ item.time }}</span>
        </div>
      </li>
    </ul>

    <p v-if="lostItems.length === 0" class="empty-tip">暂无失物招领信息</p>
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

.item-card {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.item-card:hover {
  background: #f5f7fa;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.item-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.tag-lost {
  background: #fef0f0;
  color: #e74c3c;
}

.tag-found {
  background: #f0f9eb;
  color: #67c23a;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
}

.item-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 40px;
}
</style>
