import type { VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import Empty from '../empty'
import { useBaseConfig } from './context.ts'

type ComponentName
  = | 'Table'
    | 'Table.filter' /* 👈 5.20.0+ */
    | 'List'
    | 'Select'
    | 'TreeSelect'
    | 'Cascader'
    | 'Transfer'
    | 'Mentions'

interface EmptyProps {
  componentName?: ComponentName
}

export const DefaultRenderEmpty = defineComponent<EmptyProps>(
  (props) => {
    const { prefixCls } = useBaseConfig('empty')
    return () => {
      const { componentName } = props
      const prefix = prefixCls.value
      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} class={`${prefix}-small`} />
          /**
           * This type of component should satisfy the nullish coalescing operator(??) on the left-hand side.
           * to let the component itself implement the logic.
           * For example `Table.filter`.
           */
        case 'Table.filter':
          // why `null`? legacy react16 node type `undefined` is not allowed.
          return null
        default:
          // Should never hit if we take all the component into consider.
          return <Empty />
      }
    }
  },
  {
    name: 'ADefaultRenderEmpty',
    inheritAttrs: false,
  },
)
export type RenderEmptyHandler = (componentName?: ComponentName) => VNodeChild
