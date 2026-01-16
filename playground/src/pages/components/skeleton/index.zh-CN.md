---
category: Components
group: 反馈
title: Skeleton
subtitle: 骨架屏
description: 在需要等待加载内容的位置提供一个占位图形组合。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

<DocHeading></DocHeading>

## 何时使用 {#when-to-use}

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

## 示例 {#examples}

<demo-group>
  <demo src="./demo/basic.vue">基本</demo>
  <demo src="./demo/complex.vue">复杂的组合</demo>
  <demo src="./demo/active.vue">动画效果</demo>
  <demo src="./demo/element.vue">按钮/头像/输入框/图像/自定义节点</demo>
  <demo src="./demo/children.vue">包含子组件</demo>
  <!-- <demo src="./demo/list.vue">列表</demo> -->
  <demo src="./demo/style-class.vue">自定义语义结构的样式和类</demo>
</demo-group>

## API

### 属性 {#property}

通用属性参考：[通用属性](/docs/vue/common-props)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | - | boolean | - | - |
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | boolean | - | - |
| avatar | 是否显示头像占位图 | SkeletonAvatarProps \| boolean | false | - |
| title | 是否显示标题占位图 | SkeletonTitleProps \| boolean | true | - |
| paragraph | 是否显示段落占位图 | SkeletonParagraphProps \| boolean | true | - |
| round | 为 true 时，段落和标题显示圆角 | boolean | false | - |
| classes | - | SkeletonClassNamesType | - | - |
| styles | - | SkeletonStylesType | - | - |
