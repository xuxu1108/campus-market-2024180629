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
}

// 获取所有二手交易列表
export function getTrades(): Promise<Trade[]> {
  return http.get('/trades').then((res) => res.data)
}
