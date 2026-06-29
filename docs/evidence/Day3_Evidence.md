# Day 3 Evidence — Mock 数据建模、JSON Server 与列表渲染

---

## 一、本日完成内容

### 1.1 Mock 数据设计（Task 1）

根据"校园轻集市"四大核心业务场景，在项目根目录创建 `db.json`，设计四组 Mock 数据集合：

| 数据集合 | 对应页面 | 字段设计 | 数据条数 |
|----------|----------|----------|----------|
| `trades` | 二手交易页 | id, title, price, category, condition, publisher, publishTime, location, image, status | 7 条 |
| `lostFounds` | 失物招领页 | id, title, type, itemName, location, time, contact, description, status | 6 条 |
| `groupBuys` | 拼单搭子页 | id, title, type, targetCount, currentCount, deadline, location, publisher, status | 7 条 |
| `errands` | 跑腿委托页 | id, title, taskType, reward, pickupLocation, deliveryLocation, deadline, publisher, status | 6 条 |

**数据设计原则：**
- 字段命名统一使用 camelCase 风格（如 `publishTime`、`targetCount`）；
- 每条数据均有 `status` 字段区分状态（open / closed / done），为后续交互优化预留基础；
- 数据内容全部围绕校园真实场景：教材交易、宿舍搬行李、食堂外卖拼单、图书馆占座、快递代取等；
- `image` 字段使用占位图地址 `https://placehold.co`，暂不引入真实图片资源；
- `price` 和 `reward` 使用数字类型，方便后续排序和筛选。

### 1.2 JSON Server 配置与启动（Task 2 & 3）

安装 `json-server@0.17.4` 作为开发依赖，在 `package.json` 的 `scripts` 中新增：

```json
"mock": "json-server --watch db.json --port 3001"
```

启动命令 `npm run mock` 后，JSON Server 在 `http://localhost:3001` 提供 RESTful API，支持以下端点：

- `GET /trades` — 二手交易列表
- `GET /lostFounds` — 失物招领列表
- `GET /groupBuys` — 拼单搭子列表
- `GET /errands` — 跑腿委托列表

### 1.3 Axios 请求封装（Task 4 & 5）

在 `src/api/http.ts` 中创建 Axios 实例，配置 `baseURL: 'http://localhost:3001'` 和 5 秒超时。

按业务模块拆分为四个 API 文件：

| API 模块 | 文件 | 导出方法 | 返回数据类型 |
|----------|------|----------|-------------|
| 二手交易 | `src/api/trade.ts` | `getTrades()` | `Trade[]` |
| 失物招领 | `src/api/lostFound.ts` | `getLostFounds()` | `LostFound[]` |
| 拼单搭子 | `src/api/groupBuy.ts` | `getGroupBuys()` | `GroupBuy[]` |
| 跑腿委托 | `src/api/errand.ts` | `getErrands()` | `Errand[]` |

每个 API 文件同时导出对应的 TypeScript 接口，供页面组件使用类型标注。

本日阶段刻意保持简洁：不引入 JWT Token、请求拦截器、响应拦截器、错误码处理等复杂机制。

### 1.4 通用组件抽取（Task 7 & 9）

- `ItemCard.vue`：通用列表卡片组件，支持标题、标签、价格、底部信息行、可点击等 props，被四大业务页面复用；
- `EmptyState.vue`：空状态组件，当列表数据为空时展示提示图标和文字。

### 1.5 页面列表渲染（Task 8）

四个核心页面均完成数据驱动改造：

| 页面 | API 方法 | 数据集合 | 列表渲染组件 |
|------|----------|----------|-------------|
| TradeView.vue | `getTrades()` | trades | ItemCard |
| LostFoundView.vue | `getLostFounds()` | lostFounds | ItemCard |
| GroupBuyView.vue | `getGroupBuys()` | groupBuys | ItemCard |
| ErrandView.vue | `getErrands()` | errands | ItemCard |

每个页面均采用统一的数据流模式：
1. `onMounted` 生命周期中调用 API 方法；
2. 返回数据赋值给 `ref` 响应式变量；
3. 使用 `computed` 实现分类/类型筛选；
4. `v-for` 遍历渲染 ItemCard 组件；
5. 数据为空时展示 EmptyState 组件。

---

## 二、我的设计

在设计 Mock 数据时，我围绕"校园轻集市"的四类业务场景分别思考：

**二手交易（trades）：** 核心关注"卖什么、多少钱、什么成色、在哪交易"。字段设计以 `title`、`price`、`condition`、`location` 为主，`category` 分类参考校园常见交易品类（教材、数码、生活、出行）。

**失物招领（lostFounds）：** 核心区分是"丢了找"还是"捡了还"。用 `type: 'lost' | 'found'` 字段区分，`location` 和 `time` 帮助定位，`contact` 和 `description` 提供联系和确认信息。

**拼单搭子（groupBuys）：** 核心关注"找多少人、现在几个人、什么时候截止"。用 `targetCount` 和 `currentCount` 表达进度，`deadline` 表达时效，`type` 区分拼单/搭子/组队三种子场景。

**跑腿委托（errands）：** 核心关注"从哪到哪、给多少酬劳"。用 `pickupLocation` 和 `deliveryLocation` 表达取送路径，`reward` 用数字表示酬劳金额，`taskType` 区分发布委托还是承接跑腿。

---

## 三、AI 设计

使用 Claude Code 辅助生成了 `db.json` 数据结构、API 封装代码和页面改造代码。

**AI 设计的优点：**
- 快速生成了结构完整、格式合法的 JSON 数据；
- API 模块的 TypeScript 接口定义规范，页面组件可获得完整类型提示；
- ItemCard 组件的 props 设计合理，通过 `tag`/`tagType`/`price`/`meta` 四个维度覆盖了四类业务页面的不同展示需求；
- 页面改造保持了原有的筛选交互和样式风格，改动集中在数据获取层。

**AI 设计的问题：**
- 初版数据中存在一条"代写作业"的跑腿任务，不符合校园规范，人工删除替换为"代打印文件"；
- 部分字段命名不够统一（如有的用 `createTime`，有的用 `pubTime`），人工统一为 `publishTime`；
- 初版 API 模块过于简单，未导出 TypeScript 接口，人工补充了 `Trade`、`LostFound`、`GroupBuy`、`Errand` 四个接口导出，方便页面使用类型标注；
- 筛选逻辑最初写在模板中，可读性较差，人工改为使用 `computed` 属性的方式。

---

## 四、人工修改与判断

| 修改项 | 原因 | 处理方式 |
|--------|------|----------|
| 删除"代写作业"跑腿任务 | 不符合校园规范 | 替换为"代打印文件" |
| 统一时间字段为 `publishTime` | 多类数据字段命名不一致 | 全局统一命名 |
| 补全 TypeScript 接口导出 | API 模块缺少类型定义 | 每个 API 文件导出对应接口 |
| 筛选逻辑改用 `computed` | 模板中直接调用 `filter` 可读性差 | 提取为 `filteredList` computed |
| 确保每类数据 ≥ 5 条 | 初版只有 4 条 | 补充到 6-7 条 |
| 状态字段统一为 open/closed/done | 初版混合使用 active/inactive | 统一为三种状态值 |
| 删除过度设计的字段 | 初版有 userId、roleId 等关联字段 | Day3 阶段不需要复杂关联 |

---

## 五、问题与处理

| 问题 | 原因 | 处理方式 |
|------|------|----------|
| pnpm 安装依赖较慢 | 网络原因 | 增加超时等待时间，最终安装成功 |
| 旧版 `.gitkeep` 文件与新文件共存 | `src/api/` 和 `src/components/` 原来只有 `.gitkeep` | 创建实际文件后删除 `.gitkeep` |

---

## 六、构建验证

- `vue-tsc --build` 类型检查：零错误通过
- `vite build` 生产构建：成功，生成 10 个 JS chunk + 11 个 CSS 文件
- JSON Server 接口可访问性：`npm run mock` 启动成功，四个端点均可正常返回数据

---

## 七、后续计划

- **Day 4：** 发布表单功能（二手发布、失物发布、拼单发布、跑腿发布）
- **Day 5：** 状态管理（Pinia Store 管理用户状态和列表数据）
- **Day 6：** 交互优化（加载状态、错误处理、筛选联动）

---

> Day3 Mock 数据、JSON Server 与列表渲染完成。
