<script setup lang="ts">
// 拼单搭子页 — 展示拼单、搭子、组队信息
const groupList = [
  { id: 1, title: '外卖拼单 — 奶茶满减', count: '2/4人', deadline: '今天 18:00', type: '拼单' },
  { id: 2, title: '期末自习搭子', count: '3/5人', deadline: '长期有效', type: '搭子' },
  { id: 3, title: '篮球组队 4v4', count: '5/8人', deadline: '周六 15:00', type: '组队' },
  { id: 4, title: '拼车去火车站', count: '2/4人', deadline: '周日 8:00', type: '拼单' },
]
</script>

<template>
  <section class="group-buy">
    <h2 class="section-title">👥 拼单搭子</h2>
    <p class="section-desc">找人一起拼、一起学、一起玩</p>

    <!-- 类型筛选 -->
    <div class="tab-bar">
      <button class="tab-btn active">全部</button>
      <button class="tab-btn">拼单</button>
      <button class="tab-btn">搭子</button>
      <button class="tab-btn">组队</button>
    </div>

    <!-- 拼单列表 -->
    <ul class="group-list">
      <li v-for="item in groupList" :key="item.id" class="group-card">
        <div class="group-header">
          <span class="group-tag">{{ item.type }}</span>
          <span class="group-title">{{ item.title }}</span>
        </div>
        <div class="group-meta">
          <span>👤 {{ item.count }}</span>
          <span>⏰ {{ item.deadline }}</span>
        </div>
      </li>
    </ul>

    <p v-if="groupList.length === 0" class="empty-tip">暂无拼单信息</p>
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

.group-card {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.group-card:hover {
  background: #f5f7fa;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.group-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  background: #e8f4fd;
  color: #409eff;
}

.group-title {
  font-size: 15px;
  font-weight: 500;
}

.group-meta {
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
