import axios from 'axios'

// 创建 Axios 实例，配置 JSON Server 基础地址
const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default http
