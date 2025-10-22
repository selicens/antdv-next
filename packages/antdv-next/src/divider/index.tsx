import type { App, CSSProperties } from 'vue'
import type { ComponentBaseProps } from '../config-provider/context.ts'
import type { SizeType } from '../config-provider/SizeContext.tsx'
import { classNames } from '@v-c/util'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { computed, defineComponent } from 'vue'
import { useComponentConfig } from '../config-provider/context.ts'
import { useSize } from '../config-provider/hooks/useSize.ts'
import useStyle from './style'

export interface DividerProps extends ComponentBaseProps {
  type?: 'horizontal' | 'vertical'
  /**
   * @default center
   */
  orientation?:
    | 'left'
    | 'right'
    | 'center'
    | 'start' // 👈 5.24.0+
    | 'end' // 👈 5.24.0+
  orientationMargin?: string | number
  dashed?: boolean
  /**
   * @since 5.20.0
   * @default solid
   */
  variant?: 'dashed' | 'dotted' | 'solid'
  size?: SizeType
  plain?: boolean
}

const sizeClassNameMap: Record<string, string> = { small: 'sm', middle: 'md' }

const defaultProps = {
  orientation: 'center',
  variant: 'solid',
  type: 'horizontal',
  orientationMargin: undefined,
} as any
const Divider = defineComponent<DividerProps>(
  (props = defaultProps, { slots, attrs }) => {
    const componentCtx = useComponentConfig('divider')
    const prefixCls = computed(() => componentCtx.value.getPrefixCls('divider', props.prefixCls))
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls)
    const sizeFullName = useSize(computed(() => props.size))
    const sizeCls = computed(() => sizeClassNameMap[sizeFullName.value!])
    const mergedOrientation = computed(() => {
      const orientation = props.orientation
      const direction = componentCtx.value.direction
      if (orientation === 'left') {
        return direction === 'rtl' ? 'end' : 'start'
      }
      if (orientation === 'right') {
        return direction === 'rtl' ? 'start' : 'end'
      }
      return orientation
    })

    const hasMarginStart = computed(() => mergedOrientation.value === 'start' && props.orientationMargin != null)
    const hasMarginEnd = computed(() => mergedOrientation.value === 'end' && props.orientationMargin != null)

    const memoizedOrientationMargin = computed(() => {
      const orientationMargin = props.orientationMargin
      if (typeof orientationMargin === 'number') {
        return `${orientationMargin}px`
      }
      if (/^\d+$/.test(orientationMargin!)) {
        return `${Number(orientationMargin)}px`
      }
      return orientationMargin!
    })
    return () => {
      const {
        variant,
        dashed,
        type,
        plain,
        rootClass,
      } = props
      const children = filterEmpty(slots?.default?.())
      const hasChildren = children.length > 0
      const classString = classNames(
        prefixCls.value,
        componentCtx.value.class,
        hashId.value,
        cssVarCls.value,
        `${prefixCls.value}-${type}`,
        {
          [`${prefixCls.value}-with-text`]: hasChildren,
          [`${prefixCls.value}-with-text-${mergedOrientation.value}`]: hasChildren,
          [`${prefixCls.value}-dashed`]: !!dashed,
          [`${prefixCls.value}-${variant}`]: variant !== 'solid',
          [`${prefixCls.value}-plain`]: !!plain,
          [`${prefixCls.value}-rtl`]: componentCtx.value?.direction === 'rtl',
          [`${prefixCls.value}-no-default-orientation-margin-start`]: hasMarginStart.value,
          [`${prefixCls.value}-no-default-orientation-margin-end`]: hasMarginEnd.value,
          [`${prefixCls.value}-${sizeCls.value}`]: !!sizeCls.value,
        },
        rootClass,
      )
      const innerStyle: CSSProperties = {
        marginInlineStart: hasMarginStart.value ? memoizedOrientationMargin.value : undefined,
        marginInlineEnd: hasMarginEnd.value ? memoizedOrientationMargin.value : undefined,
      }
      return wrapCSSVar(
        <div class={classString} style={componentCtx.value.style} {...attrs} role="separator">
          {hasChildren && type !== 'vertical' && (
            <span class={`${prefixCls.value}-inner-text`} style={innerStyle}>
              {children}
            </span>
          )}
        </div>,
      )
    }
  },
  {
    name: 'ADivider',
    inheritAttrs: false,
  },
)

;(Divider as any).install = (app: App) => {
  app.component(Divider.name, Divider)
}

export default Divider
