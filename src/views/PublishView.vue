<script setup lang="ts">
// 发布页 — 用于发布商品、失物、拼单或跑腿信息
const publishTypes = [
  { value: 'trade', label: '二手交易' },
  { value: 'lost-found', label: '失物招领' },
  { value: 'group-buy', label: '拼单搭子' },
  { value: 'errand', label: '跑腿委托' },
]
</script>

<template>
  <section class="publish">
    <h2 class="section-title">📝 发布信息</h2>
    <p class="section-desc">发布商品、失物招领、拼单或跑腿信息</p>

    <form class="publish-form" @submit.prevent>
      <label>发布类型</label>
      <select>
        <option value="">请选择发布类型</option>
        <option v-for="pt in publishTypes" :key="pt.value" :value="pt.value">
          {{ pt.label }}
        </option>
      </select>

      <label>标题</label>
      <input type="text" placeholder="请输入信息标题" />

      <label>详细描述</label>
      <textarea rows="4" placeholder="请详细描述你要发布的信息"></textarea>

      <label>价格 / 报酬（¥）</label>
      <input type="number" placeholder="0.00" />

      <label>所在校区</label>
      <select>
        <option value="">请选择校区</option>
        <option>主校区</option>
        <option>东校区</option>
        <option>西校区</option>
      </select>

      <button type="submit" class="btn-submit">发布</button>
    </form>
  </section>
</template>

<style scoped>
.publish {
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

.btn-submit:hover {
  background: #337ecc;
}
</style>
