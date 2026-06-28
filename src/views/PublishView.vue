<script setup lang="ts">
// 发布页 — 商品发布表单
</script>

<template>
  <section class="publish">
    <h2>📝 发布商品</h2>

    <form class="publish-form" @submit.prevent>
      <label>商品标题</label>
      <input type="text" placeholder="请输入商品标题" />

      <label>商品描述</label>
      <textarea rows="4" placeholder="请描述商品状况、规格等信息"></textarea>

      <label>价格（¥）</label>
      <input type="number" placeholder="0.00" />

      <label>分类</label>
      <select>
        <option value="">请选择分类</option>
        <option>教材</option>
        <option>数码</option>
        <option>服饰</option>
        <option>生活</option>
        <option>娱乐</option>
      </select>

      <button type="submit" class="btn-submit">发布</button>
    </form>
  </section>
</template>

<style scoped>
.publish {
  padding: 16px;
}
.publish-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 480px;
}
.publish-form label {
  font-weight: 500;
  margin-top: 8px;
}
.publish-form input,
.publish-form textarea,
.publish-form select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.btn-submit {
  margin-top: 16px;
  padding: 10px 0;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>
