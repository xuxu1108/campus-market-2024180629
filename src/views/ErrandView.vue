<script setup lang="ts">
// 跑腿委托页 — 展示跑腿任务与委托信息
const errandList = [
  { id: 1, title: '代取快递 — 中通 3件', fee: '¥5', location: '菜鸟驿站', time: '今天', type: '委托' },
  { id: 2, title: '代买早餐 — 一食堂', fee: '¥3', location: '一食堂 → 7号楼', time: '每天 7:30', type: '跑腿' },
  { id: 3, title: '帮忙搬宿舍行李', fee: '¥20', location: '3号楼 → 9号楼', time: '周六全天', type: '委托' },
  { id: 4, title: '图书馆占座 — 考研区', fee: '¥2', location: '图书馆三楼', time: '工作日 6:30', type: '跑腿' },
]
</script>

<template>
  <section class="errand">
    <h2 class="section-title">🏃 跑腿委托</h2>
    <p class="section-desc">发布跑腿任务，或者接单赚零花钱</p>

    <!-- 类型筛选 -->
    <div class="tab-bar">
      <button class="tab-btn active">全部</button>
      <button class="tab-btn">委托</button>
      <button class="tab-btn">跑腿</button>
    </div>

    <!-- 任务列表 -->
    <ul class="errand-list">
      <li v-for="item in errandList" :key="item.id" class="errand-card">
        <div class="errand-header">
          <span class="errand-tag" :class="item.type === '委托' ? 'tag-ask' : 'tag-run'">
            {{ item.type }}
          </span>
          <span class="errand-title">{{ item.title }}</span>
          <span class="errand-fee">{{ item.fee }}</span>
        </div>
        <div class="errand-meta">
          <span>📍 {{ item.location }}</span>
          <span>🕐 {{ item.time }}</span>
        </div>
      </li>
    </ul>

    <p v-if="errandList.length === 0" class="empty-tip">暂无跑腿任务</p>
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

.errand-card {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.errand-card:hover {
  background: #f5f7fa;
}

.errand-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.errand-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.tag-ask {
  background: #fef0f0;
  color: #e74c3c;
}

.tag-run {
  background: #f0f9eb;
  color: #67c23a;
}

.errand-title {
  font-size: 15px;
  font-weight: 500;
  flex: 1;
}

.errand-fee {
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
}

.errand-meta {
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
