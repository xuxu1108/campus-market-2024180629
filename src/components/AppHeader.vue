<script setup lang="ts">
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">校园轻集市</h1>
    <slot />
  </header>
</template>

<style scoped>
.app-header {
  background: #409eff;
  color: #fff;
  padding: 16px 16px 12px;
}

.app-title {
  font-size: 18px;
  text-align: center;
  margin-bottom: 12px;
}
</style>
