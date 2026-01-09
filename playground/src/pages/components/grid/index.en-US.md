---
category: Components
group: Layout
title: Grid
description: 24 Grids System.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mfJeS6cqZrEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DLUwQ4B2_zQAAAAAAAAAAAAADrJ8AQ/original
---

<DocHeading></DocHeading>

## When To Use {#when-to-use}

Grid is a 24-column layout system based on Flex. Use it to build page layouts, align content blocks, and create responsive designs.

- Use `Row` to create horizontal groups and place `Col` inside; only `Col` can be direct children of `Row`.
- Columns span 1-24. If the total span in a `Row` exceeds 24, the remaining columns wrap to the next line.
- Use `justify`, `align`, and `order` to control alignment and ordering.

## Examples {#examples}

<demo-group>
  <demo src="./demo/basic.vue">Basic Grid</demo>
  <demo src="./demo/gutter.vue">Grid Gutter</demo>
  <demo src="./demo/offset.vue">Column offset</demo>
  <demo src="./demo/sort.vue">Grid sort</demo>
  <demo src="./demo/flex.vue">Typesetting</demo>
  <demo src="./demo/flex-align.vue">Alignment</demo>
  <demo src="./demo/flex-order.vue">Order</demo>
  <demo src="./demo/flex-stretch.vue">Flex Stretch</demo>
  <demo src="./demo/responsive.vue">Responsive</demo>
  <demo src="./demo/responsive-flex.vue">Flex Responsive</demo>
  <demo src="./demo/responsive-more.vue">More responsive</demo>
  <demo src="./demo/playground.vue">Playground</demo>
  <demo src="./demo/useBreakpoint.vue">useBreakpoint Hook</demo>
</demo-group>

## API

### Property {#property}

Common props ref：[Common props](/docs/vue/common-props)

#### Row

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| gutter | Spacing between grids. Supports responsive object like `{ xs: 8, sm: 16, md: 24 }` or array `[horizontal, vertical]`. | Gutter \| [Gutter, Gutter] | 0 | string: 5.28.0 |
| align | Vertical alignment | RowAlign \| ResponsiveAligns | `top` | object: 4.24.0 |
| justify | Horizontal arrangement | RowJustify \| ResponsiveJustify | `start` | object: 4.24.0 |
| prefixCls | Custom prefix class name | string | - | - |
| wrap | Auto wrap line | boolean | true | 4.8.0 |

#### Col

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| flex | Flex layout style | FlexType | - | - |
| span | Number of columns to occupy, `0` corresponds to `display: none` | ColSpanType | - | - |
| order | Column order | ColSpanType | 0 | - |
| offset | Number of columns to offset on the left | ColSpanType | 0 | - |
| push | Number of columns to push to the right | ColSpanType | 0 | - |
| pull | Number of columns to pull to the left | ColSpanType | 0 | - |
| prefixCls | Custom prefix class name | string | - | - |
| xs | `screen < 576px` responsive grid, could be a span or an object | ColSpanType \| ColSize | - | - |
| sm | `screen ≥ 576px` responsive grid, could be a span or an object | ColSpanType \| ColSize | - | - |
| md | `screen ≥ 768px` responsive grid, could be a span or an object | ColSpanType \| ColSize | - | - |
| lg | `screen ≥ 992px` responsive grid, could be a span or an object | ColSpanType \| ColSize | - | - |
| xl | `screen ≥ 1200px` responsive grid, could be a span or an object | ColSpanType \| ColSize | - | - |
| xxl | `screen ≥ 1600px` responsive grid, could be a span or an object | ColSpanType \| ColSize | - | - |

### Slots {#slots}

#### Row

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| default | Row content. Only `Col` can be direct children. | () => VueNode | - |

#### Col

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| default | Column content. | () => VueNode | - |

### Type Definitions

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
