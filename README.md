# 校园轻集市 — Campus Market

基于 Vue 3 的校园生活服务平台前端项目，覆盖二手交易、失物招领、拼单搭子、跑腿委托四大校园业务场景。

---

## 项目简介

校园轻集市是一个面向校园生活场景的轻量级信息发布与浏览平台。学生可以在平台上浏览和发布二手交易信息、失物招领信息、拼单搭子活动和跑腿委托任务。

---

## 功能说明

### 已实现功能

| 功能 | 说明 |
|------|------|
| 首页 | 四大业务分类入口（二手交易/失物招领/拼单搭子/跑腿委托） |
| 二手交易 | 商品列表浏览、分类筛选（教材/数码/生活/出行）、关键词搜索、收藏/取消收藏 |
| 失物招领 | 失物/招领信息列表、类型筛选（全部/失物/招领）、收藏 |
| 拼单搭子 | 拼单/搭子/组队信息列表、类型筛选、人数进度展示、收藏 |
| 跑腿委托 | 跑腿任务列表、委托/跑腿类型筛选、酬劳展示、收藏 |
| 信息发布 | 统一发布页面，支持四类业务发布，含表单校验 |
| 用户注册/登录 | 基于 JSON Server 的 Mock 注册和登录，localStorage 状态持久化 |
| 个人中心 | 用户资料展示、我的收藏列表、取消收藏 |
| 消息中心 | 消息列表展示（静态示例数据） |
| 商品详情 | 通过路由参数查看商品详情（占位） |
| 交互优化 | 加载状态 (LoadingState)、错误状态 (ErrorState)、空状态 (EmptyState)、搜索栏 (SearchBar) |

### 功能边界说明

- 用户注册/登录基于 JSON Server + localStorage 实现，仅用于实训模拟，不是生产级安全认证
- 收藏数据存储在 Pinia 内存中，刷新页面后会丢失
- 图片使用占位图地址，未实现真实图片上传
- 未实现：支付、实时聊天、后台管理、JWT 鉴权、密码加密

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 | ^3.5.38 |
| 语言 | TypeScript | ~6.0.0 |
| 构建工具 | Vite | ^8.0.16 |
| 状态管理 | Pinia | ^3.0.4 |
| 路由 | Vue Router | ^5.1.0 |
| HTTP 请求 | Axios | ^1.18.1 |
| Mock 服务 | JSON Server | 0.17.4 |
| 包管理 | pnpm | 11.9.0 |
| 代码检查 | ESLint + Oxlint | ^10.5.0 / ~1.69.0 |
| 类型检查 | vue-tsc | ^3.3.5 |

---

## 快速开始

### 环境要求

- Node.js ^22.18.0 或 >=24.12.0
- pnpm 11.9.0

### 安装依赖

```bash
pnpm install
```

### 启动 Mock 服务

```bash
npm run mock
```

JSON Server 将在 `http://localhost:3001` 启动，提供以下 RESTful API：

- `GET/POST /trades` — 二手交易
- `GET/POST /lostFounds` — 失物招领
- `GET/POST /groupBuys` — 拼单搭子
- `GET/POST /errands` — 跑腿委托
- `GET/POST /users` — 用户

### 启动前端项目

```bash
npm run dev
```

浏览器访问 `http://localhost:5173`

### 构建项目

```bash
pnpm build
```

### 测试账号

| 用户名 | 密码 |
|--------|------|
| student | 123456 |

---

## 项目目录结构

```
campus-market-seed
├── db.json                    # Mock 数据文件（JSON Server）
├── index.html                 # HTML 入口
├── vite.config.ts             # Vite 配置
├── tsconfig.json              # TypeScript 配置
├── package.json               # 项目配置与依赖
├── README.md                  # 项目说明文档
├── CHECK_REPORT.md            # 检测报告
├── docs/
│   ├── evidence/              # 每日过程性证据卡 (Day1—Day7)
│   ├── ai/                    # AI 协作记录
│   └── guide/                 # 环境配置与快速开始指南
├── scripts/                   # 自动检测脚本
├── public/                    # 静态资源
└── src/
    ├── main.ts                # 应用入口
    ├── App.vue                # 根组件
    ├── api/                   # API 接口层
    │   ├── http.ts            # Axios 实例配置
    │   ├── trade.ts           # 二手交易接口
    │   ├── lostFound.ts       # 失物招领接口
    │   ├── groupBuy.ts        # 拼单搭子接口
    │   ├── errand.ts          # 跑腿委托接口
    │   └── user.ts            # 用户接口
    ├── components/            # 公共组件
    │   ├── AppLayout.vue      # 应用布局容器
    │   ├── AppHeader.vue      # 顶部导航栏
    │   ├── AppNav.vue         # 底部导航菜单
    │   ├── ItemCard.vue       # 通用列表卡片
    │   ├── EmptyState.vue     # 空状态组件
    │   ├── LoadingState.vue   # 加载状态组件
    │   ├── ErrorState.vue     # 错误状态组件
    │   ├── SearchBar.vue      # 搜索栏组件
    │   └── FormField.vue      # 表单字段组件
    ├── router/
    │   └── index.ts           # 路由配置（10 条路由）
    ├── stores/                # Pinia 状态管理
    │   ├── user.ts            # 用户状态 Store
    │   └── favorite.ts        # 收藏状态 Store
    └── views/                 # 页面视图
        ├── HomeView.vue       # 首页
        ├── TradeView.vue      # 二手交易
        ├── DetailView.vue     # 商品详情
        ├── LostFoundView.vue  # 失物招领
        ├── GroupBuyView.vue   # 拼单搭子
        ├── ErrandView.vue     # 跑腿委托
        ├── PublishView.vue    # 发布信息
        ├── MessageView.vue    # 消息中心
        ├── LoginView.vue      # 登录
        ├── RegisterView.vue   # 注册
        └── UserCenterView.vue # 个人中心
```

---

## 每日开发记录

| 日期 | 主题 | 主要内容 |
|------|------|----------|
| Day1 | 项目启动与业务梳理 | 理解项目架构、分析核心代码、完成项目规划、AI 协作体验 |
| Day2 | 页面骨架与路由导航 | 创建 8 个业务页面、配置 9 条路由、拆分公共布局组件 |
| Day3 | Mock 数据与列表渲染 | 设计四类 Mock 数据、配置 JSON Server、封装 API 层、列表渲染 |
| Day4 | 发布表单与数据新增 | 统一发布表单、类型切换、表单校验、POST 数据新增 |
| Day5 | 状态管理与用户中心 | 创建 Pinia Store（用户/收藏）、个人中心、收藏联动 |
| Day6 | 交互优化与体验完善 | 注册/登录闭环、状态持久化、加载/错误/空状态组件、搜索功能 |
| Day7 | 综合验收与项目展示 | 功能走查、构建检查、README 整理、证据归档、项目展示准备 |

---

## AI 协作说明

本项目在开发过程中使用 Claude Code（Anthropic）辅助完成页面骨架搭建、Mock 数据设计、API 接口封装、表单设计与校验、状态管理配置和交互优化。

开发者对 AI 生成的内容进行了人工审查、修改和取舍，具体过程记录在 `docs/ai/AI_Collaboration_Card.md` 和 `docs/evidence/` 中。

AI 协作的核心原则：
- AI 辅助生成代码框架，人工审查业务逻辑和场景贴合度
- AI 提供多种实现方案，人工根据项目需求做出选择
- 最终代码的正确性和可维护性由开发者负责


