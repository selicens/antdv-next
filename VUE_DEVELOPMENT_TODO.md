# Ant Design Vue 开发 TODO 列表

> 基于 `VUE_DEVELOPMENT_ORDER.md` 的完整开发计划清单，涵盖组件、RC 包、测试、文档、发布等所有阶段任务。

## 前置条件复核
- [x] 完成 `rc-util` 的 Vue 版本（确认持续维护）
- [x] 使用 Vue `<transition>` 组件取代 `rc-motion`（确认场景覆盖）

## 阶段 0：策略与基建
- [ ] 确认“由简到繁、复用优先、价值优先、测试驱动、文档同步”策略落实到团队流程
- [ ] 建立组件开发模板（`defineComponent<Props, Emits, string, SlotsType>` 规范）
- [ ] 配置 `@antdv-next/cssinjs`、主题系统与 `useStyle` 使用规范
- [ ] 搭建 CI/CD 流水线（ESLint、TypeScript、Vitest、Playwright）
- [ ] 完成 `config-provider`, `_util`, `hooks` 等公共能力梳理与文档化
- [ ] 同步 Playground、Story Demo 的演示规范与目录结构
- [ ] 明确国际化、多语言文件的管理策略

---

## 阶段 1：基础组件 (Week 1-6)

### Week 1-2 基础布局组件（优先级 ⭐⭐⭐⭐⭐）
- [x] grid 栅格系统
- [x] row 行组件
- [x] col 列组件
- [x] layout 布局容器
- [x] space 间距
- [x] flex 弹性布局
- [x] divider 分割线

### Week 2-3 基础展示组件（优先级 ⭐⭐⭐⭐⭐）
- [x] icon 图标体系（含图标资源、按需加载）
- [x] button 按钮
- [x] badge 徽标数
- [x] tag 标签（简化版）
- [x] alert 警告提示
- [ ] empty 空状态
- [ ] result 结果页
- [ ] typography 排版（简化版，无 `rc-textarea` 依赖）

### Week 3-4 导航组件（优先级 ⭐⭐⭐⭐）
- [ ] breadcrumb 面包屑
- [ ] anchor 锚点
- [ ] back-top 回到顶部
- [ ] float-button 悬浮按钮

### Week 4-5 信息展示组件（优先级 ⭐⭐⭐）
- [ ] spin 加载中
- [ ] skeleton 骨架屏
- [ ] statistic 统计数值
- [ ] descriptions 描述列表
- [ ] timeline 时间轴
- [ ] watermark 水印
- [ ] qr-code 二维码

### Week 5-6 交互反馈与基础完善（优先级 ⭐⭐⭐⭐）
- [ ] tour 漫游式引导
- [ ] popconfirm 气泡确认框（基础版，等待 tooltip 完整版补强）
- [ ] theme 主题入口
- [ ] style 全局样式
- [ ] app 顶层应用容器
- [ ] version 版本信息
- [ ] overview 概览展示
- [ ] carousel 走马灯

### 阶段 1 验收 TODO
- [ ] 33 个基础组件全部实现并通过单元测试
- [ ] 建立组件开发/审查规范文档
- [ ] 基础文档、Playground Demo、API 表格齐备
- [ ] 单元测试覆盖率 ≥ 80%
- [ ] Dark Mode / 主题切换验证完成

---

## 阶段 2：核心交互组件与 RC 迁移 (Week 7-18)

### Week 7-8 选择器生态
- [ ] [RC] rc-select Vue 版本
- [ ] select 选择器
- [ ] auto-complete 自动完成

### Week 9-10 日期时间生态
- [ ] [RC] rc-picker Vue 版本（含 66+ 国际化文件）
- [ ] date-picker 日期选择
- [ ] time-picker 时间选择
- [ ] calendar 日历

### Week 11 基础交互组件
- [ ] [RC] rc-tooltip Vue 版本
- [ ] tooltip 文字提示
- [ ] popover 气泡卡片
- [ ] popconfirm 气泡确认框（完整功能版）
- [ ] [RC] rc-checkbox Vue 版本
- [ ] checkbox 多选框
- [ ] radio 单选框

### Week 12 表单与全局配置
- [ ] [RC] rc-field-form Vue 版本
- [ ] form 表单（含验证、联动、动态项、列表、嵌套）
- [ ] config-provider 全局配置（增强版）
- [ ] [RC] rc-notification Vue 版本
- [ ] message 全局提示
- [ ] notification 通知提醒
- [ ] [RC] rc-resize-observer Vue 版本
- [ ] affix 固钉
- [ ] avatar 头像
- [ ] splitter 分割面板

### Week 13-14 表格与标签
- [ ] [RC] rc-tabs Vue 版本
- [ ] tabs 标签页
- [ ] card 卡片模式
- [ ] [RC] rc-table Vue 版本
- [ ] transfer 穿梭框（依赖 rc-table 列表能力）

### Week 14-15 弹窗组件
- [ ] [RC] rc-dialog Vue 版本
- [ ] modal 对话框
- [ ] [RC] rc-drawer Vue 版本
- [ ] drawer 抽屉

### Week 15-16 导航与滑块
- [ ] [RC] rc-menu Vue 版本
- [ ] menu 导航菜单
- [ ] [RC] rc-slider Vue 版本
- [ ] slider 滑动输入条
- [ ] color-picker 颜色选择器

### Week 16-17 树形生态
- [ ] [RC] rc-tree Vue 版本（虚拟滚动、拖拽、异步加载）
- [ ] tree 树形控件

### Week 17-18 简单组件批次
- [ ] [RC] rc-collapse → collapse 折叠面板
- [ ] [RC] rc-switch → switch 开关
- [ ] [RC] rc-progress → progress 进度条
- [ ] [RC] rc-rate → rate 评分
- [ ] [RC] rc-steps → steps 步骤条
- [ ] [RC] rc-segmented → segmented 分段控制器
- [ ] [RC] rc-upload → upload 上传
- [ ] [RC] rc-image → image 图片
- [ ] [RC] rc-input-number → input-number 数字输入框
- [ ] [RC] rc-mentions → mentions 提及
- [ ] [RC] rc-virtual-list → list 列表
- [ ] [RC] rc-tween-one → tag 标签（动画增强）

### 阶段 2 验收 TODO
- [ ] 37 个单依赖组件全部实现并对齐 React 行为
- [ ] 完成 25+ 个 RC 包迁移并发布内部包
- [ ] 增补 e2e 测试覆盖核心交互流程
- [ ] 性能基线（渲染、内存）达到生产要求
- [ ] 配套文档、指南、Playground Demo 更新完毕

---

## 阶段 3：复杂组件与集成 (Week 19-24)

### Week 19-20 核心复杂组件
- [ ] table 表格（含固定列/表头、树形、可编辑、虚拟滚动、排序筛选分页、行选择、列配置、自定义渲染）
- [ ] pagination 分页（依赖 rc-pagination、rc-select，覆盖多模式、跳转、国际化、简洁模式）

### Week 20-21 输入与选择扩展
- [ ] [RC] rc-input Vue 版本
- [ ] [RC] rc-textarea Vue 版本
- [ ] input 输入框（基础、Search、Password、Group、TextArea、字数统计、自适应高度）
- [ ] [RC] rc-cascader Vue 版本
- [ ] cascader 级联选择（多级联动、搜索、自定义字段、动态加载）
- [ ] [RC] rc-dropdown Vue 版本
- [ ] dropdown 下拉菜单（多触发、菜单分组、禁用项、自定义渲染）

### Week 22 高级组件
- [ ] [RC] rc-tree-select Vue 版本
- [ ] tree-select 树选择（多选、搜索、异步、虚拟滚动）
- [ ] typography 排版（完整版，含文本省略、可编辑、复制、标题/段落/文本组件）

### Week 23-24 国际化与全局收尾
- [ ] locale 国际化配置（66+ 语言、与 ConfigProvider 集成、分页/表单国际化）
- [ ] 全量组件集成测试与回归
- [ ] 性能优化与基准评测
- [ ] 文档、迁移指南、FAQ 补充
- [ ] Beta 发布准备与社区反馈计划

### 阶段 3 验收 TODO
- [ ] 完成剩余 8 个复杂组件
- [ ] 国际化体系可运行并覆盖所有组件
- [ ] 发布 Beta 版本并收集反馈
- [ ] 与 React 版本功能、性能、包体积对齐或更优

---

## RC 包迁移总表

### 第一优先级（核心基础）
- [ ] rc-select
- [ ] rc-picker
- [ ] rc-field-form
- [ ] rc-table
- [ ] rc-tree

### 第二优先级（常用组件）
- [ ] rc-menu
- [ ] rc-tooltip
- [ ] rc-dialog
- [ ] rc-checkbox
- [ ] rc-notification
- [ ] rc-tabs
- [ ] rc-resize-observer

### 第三优先级（功能组件）
- [ ] rc-drawer
- [ ] rc-slider
- [ ] rc-input
- [ ] rc-textarea
- [ ] rc-upload
- [ ] rc-pagination

### 第四优先级（简单/单组件）
- [ ] rc-cascader
- [ ] rc-tree-select
- [ ] rc-dropdown
- [ ] rc-collapse
- [ ] rc-switch
- [ ] rc-progress
- [ ] rc-steps
- [ ] rc-segmented
- [ ] rc-rate
- [ ] rc-image
- [ ] rc-input-number
- [ ] rc-mentions
- [ ] rc-virtual-list
- [ ] rc-tween-one

---

## 通用组件验收清单（每个组件必须完成）
- [ ] Props 实现并与 React API 对齐
- [ ] Emits 定义完整，无 `on*` Prop
- [ ] Slots 实现与文档匹配，支持 RenderNodeFn 约定
- [ ] 方法 / API 对齐 React 版本
- [ ] TypeScript 类型定义完整（Props/Emits/SlotsType）
- [ ] Vitest 单元测试覆盖 ≥ 80%
- [ ] Playwright / E2E 场景通过
- [ ] ESLint、TypeScript 0 警告
- [ ] 样式对齐 React 版本，支持主题、暗色模式、CSS 变量
- [ ] 响应式布局与 SSR 验证
- [ ] WCAG 2.1 AA 可访问性校验（键盘导航、ARIA、焦点、阅读器）
- [ ] Playground Demo ≥ 5 个（含 Base、rootClass/classes、自定义渲染、Loading、href 等）
- [ ] API 文档（中英文）、FAQ、迁移指南更新
- [ ] 更新变更日志与版本说明

## RC 包验收清单（每个 RC 包必须完成）
- [ ] 与 React 版本 API、配置项、事件保持一致
- [ ] Vue 3 Composition API 实现，响应式行为正确
- [ ] 生命周期、路由、状态管理（Pinia/Vuex）兼容
- [ ] 性能优化（虚拟滚动、懒加载、防抖/节流）按需实现
- [ ] 单元测试覆盖率 ≥ 90%，通过集成测试
- [ ] 编写迁移文档与示例，提供最小示例工程
- [ ] 发布 NPM 内部测试包并进行真实场景验证

---

## 测试、质量与监控
- [ ] 设立代码审查制度，所有 PR 需 Review
- [ ] 配置 ESLint + Prettier + TypeScript 自动化检查
- [ ] 建立 Bundle 体积监控（bundlephobia 或自建脚本）
- [ ] 定期使用 Chrome DevTools / Memory Profiler 做性能 & 内存分析
- [ ] 维护 Lighthouse 指标基线
- [ ] Playwright / Vitest 集成到 CI

## 风险管控与团队协作
- [ ] 制定 Vue 3 培训与知识分享计划
- [ ] 评估并分阶段发布，准备核心组件优先策略
- [ ] 准备双代码库维护策略与自动化脚本
- [ ] 明确角色分工、需求评审、技术方案、测试、发布流程
- [ ] 建立反馈渠道（GitHub Issues / Discussions）响应机制

## 发布与版本规划
- [ ] v0.1.0-alpha：阶段一完成后发布
- [ ] v0.2.0-alpha：阶段二完成后发布
- [ ] v0.3.0-beta：阶段三完成后发布
- [ ] v1.0.0-rc：功能完整，准备 GA
- [ ] v1.0.0：正式发布并撰写发布博客/公告
- [ ] 完成 `pnpm -r build` 与多包发布流程演练
- [ ] 收集社区反馈，制定后续迭代计划

---

> 本 TODO 文档用于追踪 Ant Design Vue 迁移全量工作，所有条目需在项目推进中逐项勾选确认。
