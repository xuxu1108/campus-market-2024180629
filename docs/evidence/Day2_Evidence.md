# Day 2 Evidence — 多页面骨架 & 路由导航系统

---

## 一、今日完成内容

### 1.1 新增 7 个页面（Task 1：扩展 7 大页面骨架）

| 序号 | 页面名称 | 文件路径 | 功能说明 |
|------|----------|----------|----------|
| 1 | 首页 | `src/views/HomeView.vue` | 商品搜索栏、分类导航（教材/数码/服饰/生活/娱乐）、热门推荐区域 |
| 2 | 商品列表 | `src/views/ListView.vue` | 分类筛选按钮、静态示例商品列表、点击跳转详情|
| 3 | 商品详情 | `src/views/DetailView.vue` | 通过 `useRoute().params.id` 获取路由参数、商品信息展示卡片、购买/加购按钮 |
| 4 | 商品发布 | `src/views/PublishView.vue` | 完整表单骨架：标题、描述、价格、分类下拉、提交按钮 |
| 5 | 消息中心 | `src/views/MessageView.vue` | 消息列表（系统通知/交易提醒）、时间戳、空状态提示 |
| 6 | 个人中心 | `src/views/ProfileView.vue` | 用户头像卡片、功能入口菜单（我的发布/收藏/订单/地址/设置） |
| 7 | 数据看板 | `src/views/BoardView.vue` | 四格统计卡片（在线商品/今日新增/注册用户/今日成交）、图表占位区域 |

每个页面均包含：
- `<script setup lang="ts">` 结构
- 语义化 `<template>` 骨架
- 局部 `<style scoped>` 样式
- 符合 Vue 3 Composition API 规范

### 1.2 路由系统设计（Task 2：完善路由系统）

更新 `src/router/index.ts`，新增 7 条路由：

| 路由路径 | 路由名称 | 对应组件 | meta.title | 加载方式 |
|----------|----------|----------|------------|----------|
| `/` | home | HomeView | 首页 | 直接导入（首屏） |
| `/list` | list | ListView | 商品列表 | 懒加载 `() => import(...)` |
| `/detail/:id` | detail | DetailView | 商品详情 | 懒加载 |
| `/publish` | publish | PublishView | 发布商品 | 懒加载 |
| `/messages` | messages | MessageView | 消息 | 懒加载 |
| `/profile` | profile | ProfileView | 个人中心 | 懒加载 |
| `/board` | board | BoardView | 数据看板 | 懒加载 |

**设计要点：**
- 首页使用直接导入，保证首屏加载速度
- 其余 6 个页面使用动态 `import()` 实现路由懒加载
- `/detail/:id` 携带动态参数 `id`，支持列表页 → 详情页的跳转
- 每条路由配置 `meta.title`，后续可用于页面标题设置

### 1.3 导航系统（Task 3：构建基础导航系统）

更新 `App.vue`，实现底部式顶部导航：

**导航栏包含 5 个入口：**
-  首页 (`/`)
-  列表 (`/list`)
-  发布 (`/publish`)
-  消息 (`/messages`)
-  我的 (`/profile`)

**交互特性：**
- `router.push()` 实现 SPA 无刷新跳转
- 当前页面按钮高亮（`active` class 绑定）
- hover 交互反馈
- 移动端友好（max-width: 480px 居中布局，适配手机屏幕）

### 1.4 进阶任务完成情况

看板页设计： BoardView.vue 包含静态统计数据（在线商品/今日新增/注册用户/今日成交）的网格卡片布局，预留图表占位区域

路由跳转增强： ListView 中点击商品项 → `router.push(/detail/${id})` → DetailView 通过 `useRoute().params.id` 获取并显示 ID

原生 HTML 导航： 项目未安装 Element Plus，使用原生 HTML + CSS 实现导航栏

---

## 二、路由设计思路

### 2.1 为什么首页使用直接导入，其余使用懒加载？

- **首页**是最频繁访问的入口，直接导入避免首屏白屏
- **其余页面**使用懒加载（`() => import(...)`），Vite 会将它们拆分为独立 chunk，用户只在需要时才下载对应 JS，减小首屏体积

### 2.2 为什么选择 History 模式？

- `createWebHistory` 生成干净的 URL（无 `#`），更符合现代 Web 标准
- 需要服务端配置 fallback，开发阶段 Vite 已内置处理

### 2.3 路由参数设计

- `/detail/:id`：RESTful 风格，`id` 为动态参数，语义清晰
- 列表页通过 `router.push(`/detail/${id}`)` 传递，详情页通过 `route.params.id` 接收

---

## 三、遇到的问题 & 解决

| 问题 | 原因 | 解决方式 |
|------|------|----------|
| `vue-tsc` 报大量 TS 错误 | `node_modules` 未安装 | `pnpm install` 安装依赖后一切正常 |
| 类型检查通过但不确定运行时是否正常 | Vite HMR 开发环境行为差异 | `vite build` 生产构建也通过，确认代码正确 |
| 导航高亮判断写 `===` 精确匹配 | URL 可能带 query string | 当前路由不涉及 query，先保持简单；后续可用 `startsWith` 或 `router.resolve` 优化 |
| Element Plus 未安装 | 种子项目不包含 UI 库 | 使用原生 HTML + CSS 写导航和样式，功能完全可用 |

---

## 四、AI 协作情况

| 维度 | 详情 |
|------|------|
| 使用工具 | Claude Code |
| 主要用途 | 更新路由配置、设计导航系统 |
| 协作次数 | 4 次会话完成全部 Day2 任务 |
| 有效输出 | 一次性创建 |
| 需要人工修正 | 有 - 人工修正开发优化 |
| 协作记录 | 详见 `docs/ai/AI_Collaboration_Card.md` |

---

## 五、后续计划

- **Day 3：** 用户认证模块（登录/注册页面、Token 管理、路由守卫）
- **Day 4：** 商品模块完善（列表/详情对接 API、发布表单增强）
- **Day 5：** 交易模块（购物车、下单、订单管理）

---


> Day2 结束。
