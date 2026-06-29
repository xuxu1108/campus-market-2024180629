import http from './http'

// 跑腿委托数据类型
export interface Errand {
  id: number
  title: string
  taskType: string
  reward: number
  pickupLocation: string
  deliveryLocation: string
  deadline: string
  publisher: string
  status: string
}

// 获取所有跑腿委托列表
export function getErrands(): Promise<Errand[]> {
  return http.get('/errands').then((res) => res.data)
}
