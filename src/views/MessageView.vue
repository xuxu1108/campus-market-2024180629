<script setup lang="ts">
// 消息页 — 展示私信、系统通知、互动消息
const messages = [
  { id: 1, type: '系统通知', title: '欢迎使用校园轻集市！', preview: '点击查看平台使用指南，快速上手…', time: '10:30' },
  { id: 2, type: '交易消息', title: '你的商品有人咨询', preview: '用户"小明"对你的「高等数学」感兴趣', time: '昨天' },
  { id: 3, type: '互动消息', title: '拼单邀请', preview: '用户"小红"邀请你加入「外卖拼单」', time: '昨天' },
  { id: 4, type: '系统通知', title: '失物招领提醒', preview: '你发布的失物「蓝色保温杯」有人认领', time: '2天前' },
]
</script>

<template>
  <section class="message">
    <h2 class="section-title">💬 消息</h2>
    <p class="section-desc">查看私信、系统通知和互动消息</p>

    <!-- 消息类型切换 -->
    <div class="tab-bar">
      <button class="tab-btn active">全部</button>
      <button class="tab-btn">私信</button>
      <button class="tab-btn">通知</button>
      <button class="tab-btn">互动</button>
    </div>

    <!-- 消息列表 -->
    <ul class="message-list">
      <li v-for="msg in messages" :key="msg.id" class="message-item">
        <div class="msg-header">
          <span class="msg-type-tag">{{ msg.type }}</span>
          <span class="msg-time">{{ msg.time }}</span>
        </div>
        <span class="msg-title">{{ msg.title }}</span>
        <span class="msg-preview">{{ msg.preview }}</span>
      </li>
    </ul>

    <p v-if="messages.length === 0" class="empty-tip">暂无消息</p>
  </section>
</template>

<style scoped>
.message {
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

.message-list {
  list-style: none;
  padding: 0;
}

.message-item {
  display: flex;
  flex-direction: column;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.message-item:hover {
  background: #f5f7fa;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.msg-type-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #e8f4fd;
  color: #409eff;
  font-weight: 500;
}

.msg-time {
  font-size: 12px;
  color: #999;
}

.msg-title {
  font-weight: 500;
  font-size: 15px;
  margin: 4px 0;
}

.msg-preview {
  font-size: 13px;
  color: #666;
}

.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 40px;
}
</style>
