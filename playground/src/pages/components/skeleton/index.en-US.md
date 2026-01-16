---
category: Components
group: Feedback
title: Skeleton
description: Provide a placeholder while you wait for content to load, or to visualize content that doesn't exist yet.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

<DocHeading></DocHeading>

## When To Use {#when-to-use}

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

## Examples {#examples}

<demo-group>
  <demo src="./demo/basic.vue">Basic</demo>
  <demo src="./demo/complex.vue">Complex combination</demo>
  <demo src="./demo/active.vue">Active Animation</demo>
  <demo src="./demo/element.vue">Button/Avatar/Input/Image/Node</demo>
  <demo src="./demo/children.vue">Contains sub component</demo>
  <!-- <demo src="./demo/list.vue">List</demo> -->
  <demo src="./demo/style-class.vue">Custom semantic dom styling</demo>
</demo-group>

## API

### Property {#property}

Common props ref：[Common props](/docs/vue/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false | - |
| loading | Display the skeleton when true | boolean | - | - |
| avatar | Show avatar placeholder | SkeletonAvatarProps \| boolean | false | - |
| title | Show title placeholder | SkeletonTitleProps \| boolean | true | - |
| paragraph | Show paragraph placeholder | SkeletonParagraphProps \| boolean | true | - |
| round | Show paragraph and title radius when true | boolean | false | - |
| classes | - | SkeletonClassNamesType | - | - |
| styles | - | SkeletonStylesType | - | - |
