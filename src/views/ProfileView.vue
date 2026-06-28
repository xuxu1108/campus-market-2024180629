<script setup lang="ts">
// 个人中心 — 用户信息、我的发布、我的订单入口
</script>

<template>
  <section class="profile">
    <h2>👤 个人中心</h2>

    <div class="user-card">
      <div class="avatar">[头像]</div>
      <div class="user-info">
        <p class="username">未登录</p>
        <p class="user-desc">登录后可查看个人信息</p>
      </div>
    </div>

    <div class="menu-list">
      <div class="menu-item">📦 我的发布</div>
      <div class="menu-item">❤️ 我的收藏</div>
      <div class="menu-item">📋 我的订单</div>
      <div class="menu-item">📍 收货地址</div>
      <div class="menu-item">⚙️ 设置</div>
    </div>
  </section>
</template>

<style scoped>
.profile {
  padding: 16px;
}
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  margin: 12px 0;
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
  margin-top: 16px;
}
.menu-item {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 15px;
}
.menu-item:hover {
  background: #f5f7fa;
}
</style>
