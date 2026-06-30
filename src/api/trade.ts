import http from './http'

// 二手交易数据类型
export interface Trade {
  id: number
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  publishTime: string
  location: string
  image: string
  status: string
  description?: string
}

// 获取所有二手交易列表
export function getTrades(): Promise<Trade[]> {
  return http.get('/trades').then((res) => res.data)
}

// 新增二手交易
export function createTrade(data: Omit<Trade, 'id'>): Promise<Trade> {
  return http.post('/trades', data).then((res) => res.data)
}
