import { defineStore } from 'pinia'
import { useUserStore } from './user'

export interface FavoriteItem {
  id: number
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  title: string
  description: string
  location?: string
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as FavoriteItem[],
  }),

  getters: {
    favoriteCount: (state) => state.favorites.length,
  },

  actions: {
    isFavorite(type: FavoriteItem['type'], id: number) {
      return this.favorites.some((item) => item.type === type && item.id === id)
    },

    addFavorite(item: FavoriteItem) {
      const userStore = useUserStore()
      
      // 检查登录状态
      if (!userStore.isLoggedIn) {
        window.alert('请先登录账号后再进行收藏操作')
        return false
      }
      
      const exists = this.isFavorite(item.type, item.id)

      if (!exists) {
        this.favorites.push(item)
      }
      return true
    },

    removeFavorite(type: FavoriteItem['type'], id: number) {
      const userStore = useUserStore()
      
      // 检查登录状态
      if (!userStore.isLoggedIn) {
        window.alert('请先登录账号后再进行此操作')
        return false
      }
      
      this.favorites = this.favorites.filter((item) => {
        return !(item.type === type && item.id === id)
      })
      return true
    },

    toggleFavorite(item: FavoriteItem) {
      const userStore = useUserStore()
      
      // 检查登录状态
      if (!userStore.isLoggedIn) {
        window.alert('请先登录账号后再进行收藏操作')
        return
      }
      
      if (this.isFavorite(item.type, item.id)) {
        this.removeFavorite(item.type, item.id)
      } else {
        this.addFavorite(item)
      }
    },
  },
})
