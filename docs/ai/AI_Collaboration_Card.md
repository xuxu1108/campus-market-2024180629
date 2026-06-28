# AI Collaboration Card

## 工具选择

**使用工具：** Claude Code (Anthropic)

**选择理由：**
- 支持多文件上下文理解
- 支持 Git 工作流集成
- 能够同时处理代码生成与文档编写

---

## 协作记录

### 协作 1：项目目录结构分析

**Prompt：**
分析 campus-market-seed 项目的目录结构，解释每个目录的职责和设计意图。

**AI 输出：**
```
campus-market-seed
├── docs/
│   ├── ai/          # AI 协作规范与记录
│   ├── evidence/    # 每日过程性证据模板
│   └── guide/       # 学生使用指南
├── scripts/         # 自动检测工具（后续版本启用）
├── src/
│   ├── api/         # API 接口层
│   ├── components/  # 公共组件
│   ├── router/      # 路由配置
│   ├── stores/      # Pinia 状态管理
│   ├── views/       # 页面视图
│   ├── App.vue      # 根组件
│   └── main.ts      # 应用入口
└── public/          # 静态资源
```

**自己的理解：**
- 项目采用了 Vue 3 生态的标准工程化目录结构
- `src/` 下的子目录按功能分层：api（数据层）、components（组件层）、router（路由层）、stores（状态层）、views（页面层）
- `docs/` 是课程特有的文档体系，包括 AI 协作记录、过程证据和操作指南
- `.gitkeep` 文件用于占位空目录，说明 api、components、stores 目录待开发

**最终结论：**
目录结构清晰，遵循 Vue 3 社区最佳实践。当前项目处于种子阶段，核心框架已就绪，api/components/stores 目录需要学生自行填充业务代码。

---

### 协作 2：解释 main.ts

**Prompt：**
逐行解释 src/main.ts 的代码，说明 Vue 应用如何创建、Pinia 和 Router 如何注册。

**AI 输出：**
```typescript
// 1. 从 vue 包导入 createApp 函数 —— Vue 3 的应用创建入口
import { createApp } from 'vue'
// 2. 从 pinia 包导入 createPinia 函数 —— 状态管理库的工厂函数
import { createPinia } from 'pinia'

// 3. 导入根组件
import App from './App.vue'
// 4. 导入路由实例
import router from './router'

// 5. 创建 Vue 应用实例，传入根组件
const app = createApp(App)

// 6. 注册 Pinia 插件 —— 通过 app.use() 安装
app.use(createPinia())
// 7. 注册 Router 插件 —— 同样通过 app.use() 安装
app.use(router)

// 8. 将应用挂载到 index.html 中的 #app 元素
app.mount('#app')
```

**自己的理解：**
- `createApp(App)` 创建一个 Vue 应用实例，App.vue 是根组件
- `app.use()` 是 Vue 3 的插件注册机制，Pinia 和 Router 都以插件形式注册
- `app.mount('#app')` 挂载到 DOM，对应 `index.html` 中的 `<div id="app">`
- 执行顺序：创建实例 → 注册插件 → 挂载 DOM

**最终结论：**
main.ts 是 Vue 3 项目的标准入口文件，遵循"创建-配置-挂载"三步模式。Pinia 必须先于 Router 注册（虽然顺序在当前项目中不影响功能，但 Pinia 可能在路由守卫中使用）。

---

### 协作 3：解释 Router 的作用

**Prompt：**
解释 src/router/index.ts 中 Router 的作用，以及为什么访问 http://localhost:5173 能看到首页。

**AI 输出：**
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  // 使用 HTML5 History 模式，基于 BASE_URL 构建路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',           // 根路径 "/"
      name: 'home',        // 路由名称
      component: HomeView, // 对应的页面组件
    },
  ],
})

export default router
```

**为什么访问 localhost:5173 能看到首页：**
1. 浏览器访问 `http://localhost:5173` → 请求根路径 `/`
2. Vue Router 匹配到 `path: '/'` 路由规则
3. 加载对应的 `HomeView.vue` 组件
4. 在 App.vue 中通过 `<RouterView />` 渲染 HomeView 内容
5. 页面显示"校园轻集市"标题和"项目启动成功"内容

**自己的理解：**
- Router 是前端路由管理器，负责 URL ↔ 页面组件的映射
- `createWebHistory` 使用浏览器 History API，URL 看起来像正常路径（没有 `#`）
- `<RouterView />` 是一个占位组件，根据当前路由动态渲染对应页面
- 当前只有一个路由 `/`，后续需要添加更多页面路由

**最终结论：**
Router 实现了 SPA（单页应用）的页面切换，用户在浏览器中切换 URL 时不会触发整页刷新，而是由 Vue Router 在客户端动态替换 `<RouterView />` 中的组件。

---

### 协作 4：项目技术栈分析

**Prompt：**
分析 campus-market-seed 项目的完整技术栈。

**AI 输出：**

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Vue 3 | ^3.5.38 | 前端 UI 框架 |
| 语言 | TypeScript | ~6.0.0 | 类型安全的 JavaScript |
| 构建工具 | Vite | ^8.0.16 | 开发服务器与打包 |
| 状态管理 | Pinia | ^3.0.4 | 全局状态管理 |
| 路由 | Vue Router | ^5.1.0 | 前端路由 |
| 包管理 | pnpm | 11.9.0 | 依赖管理 |
| 代码检查 | ESLint + Oxlint | ^10.5.0 / ~1.69.0 | 代码质量 |
| 类型检查 | vue-tsc | ^3.3.5 | Vue + TypeScript 类型检查 |
| 运行环境 | Node.js | ^22.18.0 \|\| >=24.12.0 | JavaScript 运行时 |

**自己的理解：**
- 技术栈以 Vue 3 为核心，搭配官方生态（Vue Router + Pinia）
- Vite 提供极快的开发体验（冷启动、HMR）
- TypeScript 提供类型安全
- ESLint + Oxlint 双重代码检查确保代码质量
- pnpm 作为高效的包管理器

**最终结论：**
项目采用 Vue 3 官方推荐的完整技术栈，代表了 2026 年 Vue 前端工程化的主流实践。

---

### 协作 5：Day2 多页面骨架 + 路由 + 导航批量生成

**Prompt：**
扩展 7 大页面骨架（Home/List/Detail/Publish/Message/Profile/Board）、完善路由系统、构建基础导航系统。

**AI 输出：**

| 产出 | 说明 |
|------|------|
| 7 个 Vue 页面 | 每个页面含 `<script setup>` + `<template>` + `<style scoped>`，语义化骨架 |
| 路由配置 | 7 条路由，首页直接导入 + 6 条懒加载，`/detail/:id` 支持动态参数 |
| 导航系统 | App.vue 中 5 入口顶部导航，`router.push` 跳转 + active 高亮 |
| 类型检查 | `vue-tsc --build --noEmit` 零错误通过 |
| 生产构建 | `vite build` 成功，懒加载页面拆分为独立 chunk |

**自己的理解：**
- 批量生成代码时，AI 能保持一致的结构风格（每个文件的 script/template/style 结构相同）
- 路由懒加载是 Vue + Vite 的推荐实践，非首屏页面使用 `() => import(...)` 拆分 chunk
- 导航使用 `router.push` 而非 `<router-link>` 是为了配合按钮样式和点击逻辑
- `/detail/:id` 的路由参数设计遵循 RESTful 风格，语义清晰

**最终结论：**
AI 在批量结构化代码生成方面效率极高，一次会话完成 7 个页面 + 路由 + 导航的生产，且通过类型检查和构建验证。

---

---

### 协作 6：Day2 页面结构重构 — 对齐校园业务场景

**Prompt：**
根据"校园轻集市"Day2 任务规范，重构页面骨架和路由导航。要求：
- 创建 8 个核心页面：首页、二手交易、失物招领、拼单搭子、跑腿委托、发布、消息、个人中心
- 路由路径语义化：/trade、/lost-found、/group-buy、/errand、/publish、/message、/user
- 拆分公共布局组件：AppLayout、AppHeader、AppNav
- 删除不匹配的旧页面（ListView、BoardView、ProfileView）

**AI 输出：**
- 8 个页面组件的完整代码（每个包含 script setup + template + scoped style）
- 3 个布局组件（AppLayout 容器 + AppHeader 标题区 + AppNav 导航菜单）
- 9 条路由配置（含动态路由 /detail/:id）
- 简化的 App.vue（只引入 AppLayout）
- 更新的 Day2_Evidence.md（≥300 字，含三个关键词）

**人工审查与修改：**
1. 页面命名必须对齐"二手交易/失物招领/拼单搭子/跑腿委托"业务场景
2. 示例数据必须围绕校园生活（教材、宿舍、食堂、图书馆、校区）
3. 发布页需支持四种发布类型（非仅二手商品）
4. 导航只放 5 个核心入口，其余从首页分类进入
5. 删除 BoardView 等无关页面
6. 手动运行 vue-tsc 和 vite build 验证零错误

**最终结论：**
AI 在结构重构和批量代码生成方面效率极高，但需要人工确保业务语义与校园场景的对齐。页面骨架、路由导航和公共布局三个维度均符合 Day2 规范要求。

---

## 总结

| 维度 | 评价 |
|------|------|
| Prompt 准确性 | AI 能准确理解技术问题并给出详细解释 |
| 代码分析能力 | AI 能正确分析代码结构和执行流程 |
| 需要人工修正 | AI 输出基本正确，需要结合实际代码验证，尤其注意业务场景对齐 |
| 最佳实践 | 先自己思考，再用 AI 验证和补充；批量生成后必须逐页审查 |
