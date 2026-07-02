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
  gap: 24px;
}

.profile-card,
.panel {
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.panel h1 {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
}

.panel p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--text-base);
}

.login-link {
  display: inline-block;
  margin-top: var(--space-md);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: opacity var(--transition-fast);
}

.login-link:hover {
  opacity: 0.8;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
  font-size: 32px;
  font-weight: 800;
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.avatar:hover {
  transform: scale(1.05);
}

.profile-card h1,
.panel h2 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.profile-card p,
.hint {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--text-sm);
}

.favorite-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.remove-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 8px 16px;
  cursor: pointer;
  background: var(--color-border-light);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.remove-btn:hover {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}
</style>
