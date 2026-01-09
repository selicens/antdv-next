---
category: Components
group: 布局
title: Grid
subtitle: 栅格
description: 24 栅格系统。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mfJeS6cqZrEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DLUwQ4B2_zQAAAAAAAAAAAAADrJ8AQ/original
---

<DocHeading></DocHeading>

## 何时使用 {#when-to-use}

栅格系统基于 24 栅格与 Flex 布局，用于页面整体布局、内容区块对齐以及响应式排版。

- 通过 `Row` 建立水平布局区域，`Col` 作为内容容器，且只允许 `Col` 作为 `Row` 的直接子元素。
- 栅格跨度范围 1-24，总和超过 24 时会自动换行。
- 使用 `justify`、`align` 和 `order` 控制排列与对齐。

## 示例 {#examples}

<demo-group>
  <demo src="./demo/basic.vue">基础栅格</demo>
  <demo src="./demo/gutter.vue">区块间隔</demo>
  <demo src="./demo/offset.vue">左右偏移</demo>
  <demo src="./demo/sort.vue">栅格排序</demo>
  <demo src="./demo/flex.vue">排版</demo>
  <demo src="./demo/flex-align.vue">对齐</demo>
  <demo src="./demo/flex-order.vue">排序</demo>
  <demo src="./demo/flex-stretch.vue">Flex 填充</demo>
  <demo src="./demo/responsive.vue">响应式布局</demo>
  <demo src="./demo/responsive-flex.vue">Flex 响应式布局</demo>
  <demo src="./demo/responsive-more.vue">其他属性的响应式</demo>
  <demo src="./demo/playground.vue">栅格配置器</demo>
  <demo src="./demo/useBreakpoint.vue">useBreakpoint Hook</demo>
</demo-group>

## API

### 属性 {#property}

通用属性参考：[通用属性](/docs/vue/common-props)

#### Row

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| gutter | 栅格间隔，支持响应式对象 `{ xs: 8, sm: 16, md: 24 }`，或数组 `[水平间距, 垂直间距]` | Gutter \| [Gutter, Gutter] | 0 | string: 5.28.0 |
| align | 垂直对齐方式 | RowAlign \| ResponsiveAligns | `top` | object: 4.24.0 |
| justify | 水平排列方式 | RowJustify \| ResponsiveJustify | `start` | object: 4.24.0 |
| prefixCls | 自定义前缀类名 | string | - | - |
| wrap | 是否自动换行 | boolean | true | 4.8.0 |

#### Col

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| flex | flex 布局属性 | FlexType | - | - |
| span | 栅格占位格数，为 0 时相当于 `display: none` | ColSpanType | - | - |
| order | 栅格顺序 | ColSpanType | 0 | - |
| offset | 栅格左侧的间隔格数 | ColSpanType | 0 | - |
| push | 栅格向右移动格数 | ColSpanType | 0 | - |
| pull | 栅格向左移动格数 | ColSpanType | 0 | - |
| prefixCls | 自定义前缀类名 | string | - | - |
| xs | `窗口宽度 < 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | ColSpanType \| ColSize | - | - |
| sm | `窗口宽度 ≥ 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | ColSpanType \| ColSize | - | - |
| md | `窗口宽度 ≥ 768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | ColSpanType \| ColSize | - | - |
| lg | `窗口宽度 ≥ 992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | ColSpanType \| ColSize | - | - |
| xl | `窗口宽度 ≥ 1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | ColSpanType \| ColSize | - | - |
| xxl | `窗口宽度 ≥ 1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | ColSpanType \| ColSize | - | - |

### 插槽 {#slots}

#### Row

| 插槽 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| default | Row 内容，仅 `Col` 可作为直接子元素。 | () => VueNode | - |

#### Col

| 插槽 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| default | Col 内容。 | () => VueNode | - |

### 类型定义

```ts
type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type Gutter = number | Partial<Record<Breakpoint, number>>
type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch'
type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
type ResponsiveAligns = Partial<Record<Breakpoint, RowAlign>>
type ResponsiveJustify = Partial<Record<Breakpoint, RowJustify>>

type ColSpanType = number | string
type FlexType = number | string
interface ColSize {
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}
```
