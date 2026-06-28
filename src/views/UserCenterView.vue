<script setup lang="ts">
// 个人中心 — 展示用户资料、我的发布、收藏等内容
</script>

<template>
  <section class="user-center">
    <h2 class="section-title">👤 个人中心</h2>
    <p class="section-desc">管理你的个人信息和发布内容</p>

    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="avatar">[头像]</div>
      <div class="user-info">
        <p class="username">未登录</p>
        <p class="user-desc">登录后可查看个人信息</p>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-list">
      <div class="menu-item">
        <span class="menu-icon">📦</span>
        <span class="menu-label">我的发布</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">❤️</span>
        <span class="menu-label">我的收藏</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">📋</span>
        <span class="menu-label">我的订单</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">🔍</span>
        <span class="menu-label">浏览记录</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">⚙️</span>
        <span class="menu-label">设置</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user-center {
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

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
  margin-bottom: 20px;
}

.avatar {
  width: 64px;
  height: 64px;
  background: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
}

.username {
  font-size: 18px;
  font-weight: 600;
}

.user-desc {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.menu-list {
  border-radius: 12px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #f5f7fa;
}

.menu-icon {
  font-size: 20px;
}

.menu-label {
  flex: 1;
  font-weight: 500;
}

.menu-arrow {
  color: #ccc;
  font-size: 20px;
}
</style>
