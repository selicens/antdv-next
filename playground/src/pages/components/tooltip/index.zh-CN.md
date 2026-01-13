---
category: Components
group: 数据展示
title: Tooltip
subtitle: 文字提示
description: 简单的文字提示气泡框。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*9LKlRbWytugAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bCbPTJ7LQngAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

<DocHeading></DocHeading>

## 何时使用 {#when-to-use}

- 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
- 可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 示例 {#examples}

<demo-group>
  <demo src="./demo/basic.vue">基本</demo>
  <demo src="./demo/smooth-transition.vue">平滑过渡</demo>
  <demo src="./demo/placement.vue">位置</demo>
  <demo src="./demo/arrow.vue">箭头展示</demo>
  <demo src="./demo/shift.vue" iframe="300">贴边偏移</demo>
  <demo src="./demo/auto-adjust-overflow.vue" debug>自动调整位置</demo>
  <demo src="./demo/destroy-on-close.vue" debug>隐藏后销毁</demo>
  <demo src="./demo/colorful.vue">多彩文字提示</demo>
  <demo src="./demo/disabled.vue">禁用</demo>
  <demo src="./demo/disabled-children.vue" debug>禁用子元素</demo>
  <demo src="./demo/wrap-custom-component.vue">自定义子组件</demo>
  <demo src="./demo/style-class.vue" version="6.0.0">自定义语义结构的样式和类</demo>
</demo-group>

## API

### 属性 {#property}

通用属性参考：[通用属性](/docs/vue/common-props)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | - | AlignType | - | - |
| arrow | 支持显示、隐藏以及将箭头保持居中定位 | boolean \| &#123; pointAtCenter?: boolean &#125; | - | - |
| autoAdjustOverflow | 气泡框不可见时自动调整位置 | boolean \| AdjustOverflow | - | - |
| color | 设置背景颜色，使用该属性后内部文字颜色将自适应 | LiteralUnion&lt;PresetColorType&gt; | - | 5.27.0 |
| open | 是否显示 | boolean | - | - |
| defaultOpen | 默认是否显示 | boolean | - | - |
| getPopupContainer | 浮层渲染父节点 | (triggerNode: HTMLElement) =&gt; HTMLElement | - | - |
| destroyOnHidden | 隐藏后是否销毁 | boolean | - | - |
| zIndex | - | number | - | - |
| placement | 气泡框位置 | TooltipPlacement | - | - |
| trigger | 触发行为 | ActionType \| ActionType[] | - | - |
| fresh | - | boolean | - | - |
| mouseEnterDelay | - | number | - | - |
| mouseLeaveDelay | - | number | - | - |
| classes | 语义化结构 class，支持对象或函数 | TooltipClassNamesType | - | - |
| styles | 语义化结构 style，支持对象或函数 | TooltipStylesType | - | - |
| getTooltipContainer | - | (node: HTMLElement) =&gt; HTMLElement | - | - |
| motion | - | VcTooltipProps['motion'] | - | - |
| afterOpenChange | - | (open: boolean) =&gt; void | - | - |
| builtinPlacements | - | typeof Placements | - | - |
| title | 提示文字 | VueNode | - | - |
| overlay | - | VueNode | - | - |
| openClass | - | string | - | - |
| unique | - | boolean | - | - |

### 事件 {#events}

| 事件 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| openChange | - | (open: boolean) =&gt; void | - |
| update:open | - | (open: boolean) =&gt; void | - |

### 插槽 {#slots}

| 插槽 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| title | 提示文字 | () =&gt; any | - |

### 方法 {#methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| forcePopupAlign | Deprecated. | VoidFunction | - |
| forceAlign | - | VoidFunction | - |
| nativeElement | Wrapped dom element. Not promise valid if child not support ref | HTMLElement | - |
| popupElement | Popup dom element | HTMLDivElement | - |

### ConfigProvider - tooltip.unique {#config-provider-tooltip-unique}

可以通过 ConfigProvider 全局配置 Tooltip 的唯一性显示。当 `unique` 设置为 `true` 时，同一时间 ConfigProvider 下的 Tooltip 只会显示一个，提供更好的用户体验和平滑的过渡效果。

注意：配置后 `getPopupContainer`、`arrow` 等属性将会失效。

```vue
<template>
  <a-config-provider :tooltip="{ unique: true }">
    <a-space>
      <a-tooltip title="第一个提示">
        <a-button>按钮 1</a-button>
      </a-tooltip>
      <a-tooltip title="第二个提示">
        <a-button>按钮 2</a-button>
      </a-tooltip>
    </a-space>
  </a-config-provider>
</template>
```

## Semantic DOM {#semantic-dom}

| 名称 | 说明 |
| --- | --- |
| root | 根元素 |
| container | 提示内容容器 |
| arrow | 箭头元素 |

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Tooltip"></ComponentTokenTable>

参考 [定制主题](/docs/vue/customize-theme) 了解如何使用主题变量。

## FAQ

### 为何有时候 HOC 组件无法生效？ {#faq-hoc-component}

请确保 `Tooltip` 的子元素能接受 `mouseenter`、`mouseleave`、`pointerenter`、`pointerleave`、`focus`、`click` 事件。

请查看 https://github.com/ant-design/ant-design/issues/15909

### 为何 Tooltip 的内容在关闭时不会更新？ {#faq-content-not-update}

Tooltip 默认在关闭时会缓存内容，以防止内容更新时出现闪烁：

```vue
<a-tooltip :open="user" :title="user?.name" />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KVx7QLOYwVsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

如果需要在关闭时也更新内容，可以设置 `fresh` 属性（例如 [#44830](https://github.com/ant-design/ant-design/issues/44830) 中的场景）：

```vue
<a-tooltip :open="user" :title="user?.name" fresh />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rUbsR4xWpMsAAAAAAAAAAAAADrJ8AQ/original" />
</div>
