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
  padding: 0;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--text-base);
  margin-bottom: 24px;
}

.tab-bar {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: 24px;
}

.tab-btn {
  padding: 8px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-bg);
}

.tab-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.message-list {
  list-style: none;
  padding: 0;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.message-item {
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all var(--transition-fast);
}

.message-item:last-child {
  border-bottom: none;
}

.message-item:hover {
  background: var(--color-primary-bg);
  border-left-color: var(--color-primary);
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.msg-type-tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-weight: 600;
}

.msg-time {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.msg-title {
  font-weight: 600;
  font-size: var(--text-base);
  margin: 6px 0;
  color: var(--text-primary);
}

.msg-preview {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.empty-tip {
  text-align: center;
  color: var(--text-muted);
  margin-top: 60px;
  font-size: var(--text-base);
}
</style>
