import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks'
import type { VueNode } from '../_util/type.ts'
import type { ComponentBaseProps } from '../config-provider/context.ts'

export type SwitchSize = 'small' | 'default'

type SemanticName = 'root' | 'content'

export type SwitchClassNamesType = SemanticClassNamesType<SwitchProps, SemanticName>
export type SwitchStylesType = SemanticStylesType<SwitchProps, SemanticName>

export interface SwitchProps extends ComponentBaseProps {
  size?: SwitchSize
  checked?: boolean
  defaultChecked?: boolean
  /**
   * Alias for `checked`.
   * @since 5.12.0
   */
  value?: boolean
  /**
   * Alias for `defaultChecked`.
   * @since 5.12.0
   */
  defaultValue?: boolean
  // 这两个给插槽
  checkedChildren?: VueNode
  unCheckedChildren?: VueNode
  disabled?: boolean
  loading?: boolean
  autoFocus?: boolean
  title?: string
  tabIndex?: number
  id?: string
  classes?: SwitchClassNamesType
  styles?: SwitchStylesType
}

export interface SwitchEmits {
  // change?:
  //   click?
  'update:checked': (checked: boolean) => void
  'update:value': (checked: boolean) => void
}
