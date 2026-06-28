<script setup lang="ts">
// 首页 — 商品列表、搜索入口、分类导航
</script>

<template>
  <section class="home">
    <h2>🏠 首页</h2>
    <p>校园轻集市 — 发现身边的二手好物</p>

    <div class="search-bar">
      <input type="text" placeholder="搜索商品..." />
      <button>搜索</button>
    </div>

    <div class="category-nav">
      <span class="category-tag">📚 教材</span>
      <span class="category-tag">💻 数码</span>
      <span class="category-tag">👔 服饰</span>
      <span class="category-tag">🏠 生活</span>
      <span class="category-tag">🎮 娱乐</span>
    </div>

    <div class="hot-goods">
      <h3>🔥 热门推荐</h3>
      <p>暂无数据，敬请期待…</p>
    </div>
  </section>
</template>

<style scoped>
.home {
  padding: 16px;
}
.search-bar {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}
.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.search-bar button {
  padding: 8px 16px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.category-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}
.category-tag {
  padding: 6px 14px;
  background: #f0f2f5;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
}
.category-tag:hover {
  background: #e4e7ed;
}
.hot-goods {
  margin-top: 24px;
}
</style>
