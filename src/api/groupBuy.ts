import http from './http'

// 拼单搭子数据类型
export interface GroupBuy {
  id: number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  publisher: string
  status: string
}

// 获取所有拼单搭子列表
export function getGroupBuys(): Promise<GroupBuy[]> {
  return http.get('/groupBuys').then((res) => res.data)
}
