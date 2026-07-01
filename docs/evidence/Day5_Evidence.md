# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

今天完成了 Pinia 状态管理的基础建设，包括两个 Store（用户状态和收藏状态），更新了多个页面和组件以使用 Store，并完善了个人中心页面。

具体完成内容：
- 创建 `src/stores/user.ts` 管理当前用户信息
- 创建 `src/stores/favorite.ts` 管理收藏状态
- 更新 `AppHeader.vue` 显示当前用户名称
- 更新 `ItemCard.vue` 增加 description/location 属性和 footer 插槽
- 更新 `PublishView.vue` 使用用户 Store 作为发布人
- 更新四个列表页面（TradeView、LostFoundView、GroupBuyView、ErrandView）支持收藏功能
- 重写 `UserCenterView.vue` 展示用户资料和我的收藏

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites | addFavorite、removeFavorite、toggleFavorite、isFavorite |

**user.ts 设计：**
- state: 保存登录状态和当前用户对象（id、name、college、grade、avatar、bio）
- getters: displayName（用户名）、userDescription（学院+年级组合）
- actions: updateProfile（更新资料）、login/logout（切换登录状态）
- Day5 阶段使用模拟用户数据，不接入真实登录接口

**favorite.ts 设计：**
- state: favorites 数组，每个元素包含 id、type（业务类型）、title、description、location
- getters: favoriteCount（收藏总数）
- actions: isFavorite（判断是否已收藏）、addFavorite（添加收藏）、removeFavorite（取消收藏）、toggleFavorite（切换收藏状态）
- 收藏状态暂存前端内存，刷新后丢失（Day5 可接受）

## 3. 状态边界说明

**放入 Store 的数据（跨页面共享）：**
- 当前用户信息 — 导航栏、发布页和个人中心都需要使用
- 收藏列表 — 四个列表页和个人中心都需要使用

**未放入 Store 的数据（仅单页面使用）：**
- 表单校验错误信息 — 只属于发布页面，不需要跨页面共享
- 发布页面的临时输入内容 — 只在 PublishView 中使用
- 列表页的筛选条件（activeFilter/activeTab）— 只属于各自页面
- 列表数据（goodsList、lostItems 等）— 各页面独立从 API 获取，暂不需要跨页面缓存

**设计原则：** Pinia Store 不是用来存放所有数据的地方，而是用来存放多个页面或多个组件需要共享的状态。

## 4. 页面使用记录

| 页面/组件 | 使用的 Store | 使用方式 |
|---|---|---|
| AppHeader.vue | userStore | 显示当前用户 displayName |
| PublishView.vue | userStore | publisher 字段读取 userStore.displayName |
| TradeView.vue | favoriteStore | 收藏/取消收藏二手交易商品 |
| LostFoundView.vue | favoriteStore | 收藏/取消收藏失物招领信息 |
| GroupBuyView.vue | favoriteStore | 收藏/取消收藏拼单搭子信息 |
| ErrandView.vue | favoriteStore | 收藏/取消收藏跑腿委托任务 |
| UserCenterView.vue | userStore + favoriteStore | 展示用户资料和我的收藏列表 |

## 5. AI 协作记录

**使用的 AI 工具：** Claude Code（CLI 版本）

**核心提示词：**
本次任务按照 Day5 教学文档中的详细规范执行，包括：
1. 使用 Pinia 创建用户状态 Store 和收藏状态 Store
2. 模拟当前用户信息，不接入真实登录
3. 在四个列表页面中实现收藏和取消收藏
4. 在个人中心展示用户资料和我的收藏
5. 发布页面中的 publisher 字段改为读取当前用户名称
6. 代码保持简洁，适合教学实训项目继续扩展
7. 不加入复杂登录鉴权、JWT、后端权限系统

**AI 生成内容：**
- src/stores/user.ts — 用户状态 Store
- src/stores/favorite.ts — 收藏状态 Store
- 更新 AppHeader.vue 显示用户名
- 更新 ItemCard.vue 添加 footer 插槽和 description/location 属性
- 更新 PublishView.vue 使用 userStore.displayName
- 更新四个列表页面添加收藏按钮
- 重写 UserCenterView.vue 展示用户资料和收藏

**AI 生成内容审查：**
- AI 按照教学文档规范生成了简洁的 Store 代码，没有生成完整登录系统、JWT 或权限拦截
- Store 划分合理，用户状态和收藏状态清晰分离
- 各页面使用 Store 的方式符合预期

## 6. 人工调整内容

在 AI 生成基础上，进行了以下调整：
- 确认 ItemCard.vue 需要新增 description 和 location 属性以支持 UserCenterView 的展示需求
- 确认 AppLayout.vue 中 AppNav 通过 slot 传入 AppHeader 的方式与新 header 结构兼容
- 保持 EmptyState 组件的 `message` prop 命名不变（教学文档中使用 `text`，项目中实际使用 `message`）
- 四个列表页面的收藏按钮样式统一添加 hover 效果

## 7. 测试记录

**测试环境：** 本地开发环境（Vite dev server + JSON Server mock）

**测试步骤与结果：**

1. **导航栏用户显示测试：**
   - 打开首页，导航栏右侧显示"校园用户"
   - ✅ 通过

2. **发布页面 publisher 读取测试：**
   - 进入发布页面，选择二手交易，填写表单并提交
   - 检查 JSON Server 中新增的数据，publisher 字段为"校园用户"
   - ✅ 通过

3. **收藏功能测试（二手交易页面）：**
   - 进入二手交易页面，点击某商品的"收藏"按钮
   - 按钮文字从"收藏"变为"已收藏"
   - 再次点击，按钮文字从"已收藏"变回"收藏"
   - ✅ 通过

4. **个人中心展示测试：**
   - 进入个人中心页面
   - 看到用户头像（显示"校"字首字母）、用户名、学院年级、个人简介
   - 看到"我的收藏"区域
   - ✅ 通过

5. **收藏联动测试：**
   - 在二手交易页面收藏一个商品
   - 进入个人中心，"我的收藏"区域显示该商品
   - 点击"取消收藏"，该商品从列表中消失
   - ✅ 通过

6. **项目构建测试：**
   - 执行 `npx vue-tsc --build` — 无类型错误
   - 执行 `npx vite build` — 构建成功
   - ✅ 通过

**已知限制：**
- 刷新页面后收藏数据会丢失（收藏仅保存在 Pinia 内存中，未持久化）
- 这是 Day5 阶段可接受的行为，后续可通过 localStorage 或后端接口实现持久化

## 8. 遇到的问题与解决方法

无阻塞性问题。整个 Day5 实现过程顺利，主要得益于：
1. 项目已正确安装并挂载 Pinia（main.ts 中已有 `app.use(createPinia())`）
2. 教学文档提供了清晰的 Store 设计模板和组件更新方向
3. 现有组件结构（ItemCard、EmptyState、FormField）设计良好，扩展容易

## 9. 今日反思

Pinia 状态管理对多页面前端应用的核心价值在于解决"跨页面状态共享"问题。在 Day2—Day4 中，每个页面各自管理自己的数据，页面之间没有数据联系。例如发布页面写死了 `publisher: '当前用户'`，个人中心只显示了静态占位内容。

引入 Pinia 后，用户信息从一个 Store 统一管理，发布页面、导航栏和个人中心都从同一个数据源读取，保证了数据一致性。收藏状态同样如此——在列表页收藏的内容会立即反映在个人中心，因为两者共享同一个 favoriteStore。

本次设计强调了"状态边界"概念：并不是所有数据都应该放入 Store。表单临时输入、页面筛选条件、列表数据等只在单页面使用的数据，留在组件内部更合适。将不必要的数据放入 Store 反而会增加项目复杂度。
