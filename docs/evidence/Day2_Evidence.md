# Day 2 Evidence — 页面骨架、路由导航与公共布局

---

## 一、本日完成内容

### 1.1 页面骨架搭建（Task 1）

根据"校园轻集市"业务需求，在 `src/views/` 下创建了 8 个核心业务页面，外加 1 个商品详情页作为扩展：

| 序号 | 页面名称 | 文件路径 | 路由路径 | 业务场景 |
|------|----------|----------|----------|----------|
| 1 | 首页 | `src/views/HomeView.vue` | `/` | 平台入口，展示四大业务分类入口（二手交易/失物招领/拼单搭子/跑腿委托）与热门推荐区域 |
| 2 | 二手交易 | `src/views/TradeView.vue` | `/trade` | 二手商品列表，分类筛选（教材/数码/生活/出行），静态示例数据，点击跳转详情 |
| 3 | 失物招领 | `src/views/LostFoundView.vue` | `/lost-found` | 失物与招领信息列表，失物/招领标签区分，显示位置和时间 |
| 4 | 拼单搭子 | `src/views/GroupBuyView.vue` | `/group-buy` | 拼单/搭子/组队信息列表，显示人数和截止时间 |
| 5 | 跑腿委托 | `src/views/ErrandView.vue` | `/errand` | 跑腿任务与委托列表，委托/跑腿标签区分，显示报酬和地点 |
| 6 | 发布信息 | `src/views/PublishView.vue` | `/publish` | 统一发布表单，支持选择发布类型（二手/失物/拼单/跑腿），含标题、描述、价格、校区 |
| 7 | 消息中心 | `src/views/MessageView.vue` | `/message` | 消息列表（系统通知/交易消息/互动消息），支持类型筛选 |
| 8 | 个人中心 | `src/views/UserCenterView.vue` | `/user` | 用户信息卡片，功能菜单入口（我的发布/收藏/订单/浏览记录/设置） |
| 扩展 | 商品详情 | `src/views/DetailView.vue` | `/detail/:id` | 通过路由参数获取商品 ID，展示商品详情信息 |


每个页面均包含：
- `<script setup lang="ts">` 结构
- 语义化 `<template>` 骨架
- 局部 `<style scoped>` 样式
- 符合 Vue 3 Composition API 规范
- 贴合校园生活场景（教材、宿舍、食堂、图书馆、校区等元素）

### 1.2 路由导航配置（Task 2 & 3）

**`src/router/index.ts`** 共配置 9 条路由：

| 路由路径 | 路由名称 | 加载方式 | meta.title |
|----------|----------|----------|------------|
| `/` | home | 直接导入 | 首页 |
| `/trade` | trade | 懒加载 | 二手交易 |
| `/detail/:id` | detail | 懒加载 | 商品详情 |
| `/lost-found` | lost-found | 懒加载 | 失物招领 |
| `/group-buy` | group-buy | 懒加载 | 拼单搭子 |
| `/errand` | errand | 懒加载 | 跑腿委托 |
| `/publish` | publish | 懒加载 | 发布信息 |
| `/message` | message | 懒加载 | 消息 |
| `/user` | user | 懒加载 | 个人中心 |

**设计要点：**
- 首页使用直接导入保证首屏加载速度；其余 8 条使用动态 `import()` 懒加载，Vite 构建后拆分为独立 chunk
- 路由路径全部采用语义化命名（`/trade`、`/lost-found`、`/group-buy`、`/errand`），避免无意义路径
- `/detail/:id` 支持动态参数，从交易列表页跳转到商品详情页传参
- `main.ts` 中已完成 `app.use(router)` 注册

### 1.3 公共布局设计（Task 4 & 5）

在 `src/components/` 下创建了三层公共布局组件：

| 组件 | 文件 | 职责 |
|------|------|------|
| AppLayout | `AppLayout.vue` | 整体页面布局容器，max-width: 480px 居中，flex 纵向排列 |
| AppHeader | `AppHeader.vue` | 顶部区域：显示"校园轻集市"标题 + 插槽放置导航 |
| AppNav | `AppNav.vue` | 导航菜单：5 个入口（首页/交易/发布/消息/我的），使用 `router.push` 实现 SPA 跳转，当前页 active 高亮 |

**布局架构：**
```
App.vue
  └── AppLayout.vue
        ├── AppHeader.vue
        │     ├── 标题 "校园轻集市"
        │     └── AppNav.vue (插槽)
        └── <RouterView /> (页面内容区)
```

**组件分离原则：**
- 页面组件（views/）只关注自身业务内容
- 公共组件（components/）负责布局、导航等通用逻辑
- App.vue 极简化，只引入 AppLayout
- 后续如需调整导航结构，只需修改 AppNav.vue 一个文件

### 1.4 导航菜单设计

底部式顶部导航包含 5 个入口：
 首页 (`/`)
 交易 (`/trade`)
 发布 (`/publish`)
 消息 (`/message`)
 我的 (`/user`)

导航使用 `<button>` + `router.push()` 实现（而非 `<RouterLink>`），配合 `router.currentRoute.value.path` 判断当前页高亮。其他页面（失物招领、拼单搭子、跑腿委托、商品详情）从首页分类入口或列表页进入，不在主导航中占用位置。

---

## 二、构建验证

- `vue-tsc --build` 类型检查：零错误通过
- `vite build` 生产构建：成功，9 个页面路由全部拆分独立 chunk
- 构建产物：9 个 JS chunk + 10 个 CSS 文件（含全局样式），大小合理

---

## 三、AI 协作情况

| 维度 | 详情 |
|------|------|
| 使用工具 | Claude Code |
| 主要用途 | 分析现有代码结构，批量生成 8 个页面骨架、3 个布局组件、更新路由配置 |
| 协作模式 | AI 辅助生成代码大致框架，人工审查并确认每一处修改 |

**AI 辅助生成的内容：**
- 8 个页面组件的骨架代码（script + template + style）
- 3 个布局组件的拆分设计
- 路由配置文件的完整重写
- App.vue 的简化重构

**人工审查与修改的内容：**
1. **页面命名对齐业务：** AI 最初生成的是泛化的 ListView/BoardView 等，人工要求改为 TradeView/LostFoundView/GroupBuyView/ErrandView 等与校园场景对应的名称
2. **页面内容贴合校园：** 检查每个页面的示例数据是否围绕校园生活（教材、宿舍、食堂、图书馆、校区等），删除了不相关的内容
3. **路由路径语义化：** 将 `/list` 改为 `/trade`，`/messages` 改为 `/message`，`/profile` 改为 `/user`，新增 `/lost-found`、`/group-buy`、`/errand` 路径
4. **组件拆分合理性：** 确认 AppLayout/AppHeader/AppNav 三层分离，职责清晰不过度封装
5. **删除冗余页面：** 移除了 BoardView（数据看板）、ListView、ProfileView 三个不匹配的旧页面
6. **构建验证：** 手动执行 `vue-tsc` 和 `vite build` 确认零错误通过

---

## 四、问题与处理

| 问题 | 原因 | 处理方式 |
|------|------|----------|
| 旧版页面名称不匹配业务 | 前一版未严格对齐校园场景 | 手工重新设计页面、路径、导航结构 |
| 首页导航入口只有 5 个，但业务有 8 个页面 | 主导航空间有限 | 失物招领/拼单搭子/跑腿委托从首页分类卡片进入，交易详情从列表点击进入 |
| `.gitkeep` 文件需要保留 | `components/` 原来为空目录 | 创建实际组件文件后 `.gitkeep` 可保留作为历史标记 |

---

## 五、后续计划

- **Day 3：** 用户认证模块（登录/注册页面、Token 管理、路由守卫）
- **Day 4：** 接口对接（商品列表、详情 API、发布表单提交）
- **Day 5：** 交易流程完善（下单、订单管理）

---

> Day2 结束。