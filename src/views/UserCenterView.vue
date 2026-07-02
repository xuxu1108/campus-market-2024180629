<template>
  <section class="page">
    <div v-if="!userStore.isLoggedIn" class="panel">
      <h1>请先登录</h1>
      <p>登录后可以查看个人资料、我的收藏和我的发布。</p>
      <RouterLink class="login-link" to="/login">去登录</RouterLink>
    </div>

    <template v-else>
      <div class="profile-card">
        <div class="avatar">
          {{ userStore.displayName.slice(0, 1) }}
        </div>

        <div>
          <h1>{{ userStore.displayName }}</h1>
          <p>{{ userStore.userDescription }}</p>
          <p>{{ userStore.currentUser?.bio }}</p>
        </div>
      </div>

      <div class="panel">
        <h2>我的收藏</h2>

        <EmptyState
          v-if="favoriteStore.favorites.length === 0"
          message="暂无收藏内容"
        />

        <div v-else class="favorite-list">
          <ItemCard
            v-for="item in favoriteStore.favorites"
            :key="`${item.type}-${item.id}`"
            :title="item.title"
            :description="item.description"
            :tag="getTypeLabel(item.type)"
            :location="item.location"
          >
            <template #footer>
              <button class="remove-btn" @click="favoriteStore.removeFavorite(item.type, item.id)">
                取消收藏
              </button>
            </template>
          </ItemCard>
        </div>
      </div>

      <div class="panel">
        <h2>我的发布</h2>
        <p class="hint">
          本模块用于展示当前用户发布过的信息。后续可继续与接口数据联动。
        </p>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import EmptyState from '../components/EmptyState.vue'
import ItemCard from '../components/ItemCard.vue'
import { useFavoriteStore } from '../stores/favorite'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }

  return map[type] || '校园信息'
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card,
.panel {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.panel h1 {
  margin: 0 0 8px;
}

.panel p {
  color: #6b7280;
  line-height: 1.6;
}

.login-link {
  display: inline-block;
  margin-top: 12px;
  color: #2563eb;
  text-decoration: none;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eff6ff;
  color: #2563eb;
  font-size: 28px;
  font-weight: 700;
}

.profile-card h1,
.panel h2 {
  margin: 0 0 8px;
}

.profile-card p,
.hint {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.favorite-list {
  display: grid;
  gap: 16px;
}

.remove-btn {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}

.remove-btn:hover {
  background: #fee2e2;
  color: #e74c3c;
}
</style>
