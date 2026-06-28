<script setup lang="ts">
// 看板页 — 数据统计概览（静态展示）
const stats = [
  { label: '在线商品', value: 128 },
  { label: '今日新增', value: 15 },
  { label: '注册用户', value: 1024 },
  { label: '今日成交', value: 23 },
]
</script>

<template>
  <section class="board">
    <h2>📊 数据看板</h2>
    <p class="board-desc">平台运营数据概览（静态示例）</p>

    <div class="stat-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="chart-placeholder">
      <p>📈 交易趋势图（占位 — 后续接入 ECharts）</p>
    </div>
  </section>
</template>

<style scoped>
.board {
  padding: 16px;
}
.board-desc {
  color: #999;
  margin-bottom: 16px;
}
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.stat-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}
.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #409eff;
}
.stat-label {
  display: block;
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}
.chart-placeholder {
  margin-top: 24px;
  padding: 40px;
  background: #f5f7fa;
  border-radius: 8px;
  text-align: center;
  color: #999;
}
</style>
