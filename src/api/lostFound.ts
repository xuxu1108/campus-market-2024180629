import http from './http'

// 失物招领数据类型
export interface LostFound {
  id: number
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  time: string
  contact: string
  description: string
  status: string
}

// 获取所有失物招领列表
export function getLostFounds(): Promise<LostFound[]> {
  return http.get('/lostFounds').then((res) => res.data)
}

// 新增失物招领
export function createLostFound(data: Omit<LostFound, 'id'>): Promise<LostFound> {
  return http.post('/lostFounds', data).then((res) => res.data)
}
