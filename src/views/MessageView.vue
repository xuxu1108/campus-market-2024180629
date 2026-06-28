<script setup lang="ts">
// 消息页 — 消息通知列表
</script>

<template>
  <section class="message">
    <h2>💬 消息</h2>

    <ul class="message-list">
      <li class="message-item">
        <span class="msg-title">系统通知</span>
        <span class="msg-preview">欢迎使用校园轻集市！</span>
        <span class="msg-time">10:30</span>
      </li>
      <li class="message-item">
        <span class="msg-title">交易提醒</span>
        <span class="msg-preview">您的商品「高等数学」有人咨询</span>
        <span class="msg-time">昨天</span>
      </li>
      <li class="message-item">
        <span class="msg-title">系统通知</span>
        <span class="msg-preview">您的订单已发货，请关注物流信息</span>
        <span class="msg-time">2天前</span>
      </li>
    </ul>

    <p v-if="false" class="empty-tip">暂无消息</p>
  </section>
</template>

<style scoped>
.message {
  padding: 16px;
}
.message-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}
.message-item {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.message-item:hover {
  background: #f5f7fa;
}
.msg-title {
  font-weight: 500;
}
.msg-preview {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}
.msg-time {
  font-size: 12px;
  color: #999;
  align-self: flex-end;
}
.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 40px;
}
</style>
