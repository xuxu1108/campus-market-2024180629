# Day6 Evidence - 注册登录、交互优化与体验完善

## 1. 今日完成内容

今天完成了 Mock 注册/登录闭环、用户状态持久化、页面联动改造和交互体验优化。具体包括：
- 在 db.json 中增加 users 数据资源
- 创建用户 API 模块（src/api/user.ts）
- 创建注册页面 RegisterView.vue 和登录页面 LoginView.vue
- 改造 userStore，实现 login / logout / restoreLogin
- 使用 localStorage 保存登录状态，支持刷新恢复
- 更新导航栏根据登录状态显示不同内容
- 更新发布页面（未登录提示）和个人中心（未登录引导）
- 新增 LoadingState.vue、ErrorState.vue、SearchBar.vue 三个组件
- 为二手交易页面增加加载、错误、搜索和收藏样式优化

## 2. 注册登录设计说明

本项目注册/登录功能基于 JSON Server、Pinia 和 localStorage 实现，仅用于前端实训和状态管理模拟。

**注册流程：**
1. 用户填写用户名、密码、姓名、学院、年级
2. 前端校验表单（用户名非空、密码不少于6位、姓名/学院/年级非空）
3. 通过 GET /users 检查用户名是否已存在
4. 通过 POST /users 将新用户写入 db.json
5. 注册成功后跳转到登录页

**登录流程：**
1. 用户填写用户名和密码
2. 通过 GET /users 查询用户列表
3. 前端匹配用户名和密码
4. 匹配成功后将用户信息保存到 Pinia store
5. 同时写入 localStorage（key: campus-market-current-user）
6. 跳转到个人中心

**状态恢复：**
1. App.vue onMounted 时调用 userStore.restoreLogin()
2. 从 localStorage 读取 currentUser
3. 恢复到 Pinia store

**退出登录：**
1. 清空 userStore（currentUser = null, isLoggedIn = false）
2. 删除 localStorage 中的 currentUser
3. 跳转到登录页

## 3. 用户数据结构说明

| 字段 | 含义 | 示例 |
|---|---|---|
| username | 用户名 | student |
| password | 密码 | 123456 |
| name | 显示名称 | 校园用户 |
| college | 学院 | 计算机学院 |
| grade | 年级 | 2023级 |
| avatar | 头像 | 暂为空 |
| bio | 个人简介 | 热爱校园生活 |

## 4. 状态持久化说明

使用 localStorage 保存当前登录用户的原因：
- Pinia 中的状态存储在内存中，页面刷新后会丢失
- localStorage 是浏览器持久化存储，刷新后数据仍然存在
- App 启动时通过 restoreLogin() 从 localStorage 恢复用户状态到 Pinia
- 退出登录时同时清空 Pinia 和 localStorage，确保状态一致
- 本项目使用 localStorage 存储明文用户信息，仅用于前端实训模拟，不是生产级安全方案

## 5. 页面联动记录

登录状态影响了以下页面和组件：

| 页面/组件 | 未登录时 | 登录后 |
|---|---|---|
| 导航栏 (AppHeader) | 显示"登录"/"注册"链接 | 显示当前用户名和"退出"按钮 |
| 发布页面 (PublishView) | 提交时提示"请先登录"并跳转登录页 | 正常发布，publisher 来自当前用户 |
| 个人中心 (UserCenterView) | 显示"请先登录"引导 | 显示用户资料、收藏、发布列表 |

## 6. 交互优化记录

| 优化项 | 说明 |
|---|---|
| LoadingState.vue | 数据加载时显示旋转动画和提示文字 |
| ErrorState.vue | 请求失败时显示错误信息和重新加载按钮 |
| SearchBar.vue | 支持 v-model 双向绑定，带清空按钮 |
| 二手交易搜索 | 按标题、分类、地点、描述过滤商品 |
| 加载/错误/空状态 | TradeView 完整的状态判断链 |
| 收藏按钮 | 已收藏时显示蓝色激活样式（.active） |
| 发布按钮 | 提交中时显示"提交中..."并禁用 |
| 发布失败提示 | 明确提示检查 Mock 服务 |

## 7. AI 协作记录

- **使用的 AI 工具：** Claude Code
- **核心提示词：** 根据 Day6 任务说明，要求完成注册登录、状态持久化、交互优化
- **AI 生成内容：** db.json users 数据、user.ts API 模块、LoginView.vue、RegisterView.vue、userStore 改造、App.vue 恢复登录、AppHeader.vue 导航改造、PublishView.vue 登录检查、UserCenterView.vue 未登录状态、LoadingState.vue、ErrorState.vue、SearchBar.vue、TradeView.vue 完整改造
- **人工调整：** 所有代码均按照项目现有风格进行了适配，如 TradeView 已有的分类筛选和状态标签映射被保留并与新搜索功能合并，导航栏颜色方案保持与原有设计一致
- **未引入的复杂内容：** 没有引入 JWT、权限路由、密码加密、短信验证码、Token 刷新等超出实训范围的功能

## 8. 功能边界说明

本项目注册/登录功能基于 JSON Server、Pinia 和 localStorage 实现，仅用于前端实训和状态管理模拟，不是生产环境安全认证系统。

本项目暂未实现：
- 密码加密
- JWT Token
- 后端 Session
- 短信验证码
- 邮箱验证
- 第三方登录
- 找回密码
- 权限路由
- 服务端安全校验
- 用户头像真实上传

## 9. 完整功能走查记录

1. 启动 JSON Server：`npm run mock`
2. 启动前端项目：`npm run dev`
3. 打开首页，导航栏显示"登录"/"注册"
4. 点击注册，填写用户名 testuser、密码 123456、姓名 测试用户、学院 信息学院、年级 2024级
5. 点击注册，提示"注册成功，请登录"
6. 打开 db.json，确认 users 数组中新增了 testuser 用户
7. 使用 testuser / 123456 登录
8. 登录成功，跳转到个人中心，显示"测试用户"和"信息学院 · 2024级"
9. 导航栏显示"测试用户"和"退出"按钮
10. 刷新页面，确认登录状态保持（导航栏仍显示用户名）
11. 进入发布页，发布一条二手交易信息
12. 确认发布人是"测试用户"
13. 进入二手交易页面，使用搜索栏输入关键词，确认过滤功能正常
14. 点击收藏按钮，按钮变为蓝色"已收藏"
15. 进入个人中心，查看收藏列表中有刚收藏的信息
16. 点击退出，导航栏恢复为"登录"/"注册"
17. 进入个人中心，显示"请先登录"引导
18. 停止 JSON Server，刷新二手交易页面，观察错误状态提示
19. 恢复 JSON Server，点击"重新加载"，页面恢复正常

## 10. 遇到的问题与解决方法

**问题：** PublishView.vue 中 whitespace 匹配导致 Edit 工具首次失败
**解决方法：** 通过 Bash cat -A 检查实际空白字符，确认使用 2 空格缩进后精确匹配替换字符串，成功插入登录检查逻辑。

**问题：** userStore 从硬编码模拟用户改为真实登录状态后，多处组件需要同步适配
**解决方法：** 逐一检查 AppHeader（displayName 来源）、PublishView（publisher 字段）、UserCenterView（currentUser 可空），确保所有读取 userStore 的地方都能正确处理 isLoggedIn = false 的情况。

## 11. 今日反思

通过补充注册/登录功能，我对"用户状态"有了更完整的理解：前端应用中的用户身份不是孤立的页面功能，而是一个贯穿导航栏、发布、收藏、个人中心等所有模块的全局状态。Pinia 负责运行时状态管理，localStorage 负责刷新后的状态恢复，JSON Server 提供 Mock 数据持久化——三者协同构成了这个实训项目的用户体系。同时我也明确了功能边界：本项目是前端教学项目，注册登录仅用于模拟业务流程和状态管理练习，与生产环境的密码加密、JWT Token、权限控制等安全机制有本质区别。这次实践让我认识到**状态持久化**和**交互优化**在前端开发中的重要性——loading、error、empty 三种状态的完整覆盖是一个可演示项目的基本要求。
