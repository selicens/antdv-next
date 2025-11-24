import type { EmptyEmit } from '../../_util/type.ts'
import type { AggregationColor } from '../color'
import type { ColorFormatType } from '../interface'
import { computed, defineComponent, shallowRef, watch } from 'vue'
import { FORMAT_HEX, FORMAT_HSB, FORMAT_RGB } from '../interface'
import ColorAlphaInput from './ColorAlphaInput'
import ColorHexInput from './ColorHexInput'
import ColorHsbInput from './ColorHsbInput'
import ColorRgbInput from './ColorRgbInput'

export interface ColorInputProps {
  prefixCls: string
  format?: ColorFormatType
  onFormatChange?: (format: ColorFormatType) => void
  disabledAlpha?: boolean
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
  disabledFormat?: boolean
}

export default defineComponent<
  ColorInputProps,
  EmptyEmit,
  string
>(
  (props) => {
    const colorFormat = shallowRef<ColorFormatType>(props.format ?? FORMAT_HEX)
    watch(() => props.format, (val) => {
      if (val)
        colorFormat.value = val
    })

    const triggerFormatChange = (fmt: ColorFormatType) => {
      colorFormat.value = fmt
      props.onFormatChange?.(fmt)
    }

    const steppersNode = computed(() => {
      const inputProps = { value: props.value, prefixCls: props.prefixCls, onChange: props.onChange }
      switch (colorFormat.value) {
        case FORMAT_HSB:
          return <ColorHsbInput {...inputProps} />
        case FORMAT_RGB:
          return <ColorRgbInput {...inputProps} />
        default:
          return <ColorHexInput {...inputProps} />
      }
    })

    return () => {
      const prefixCls = props.prefixCls
      return (
        <div class={`${prefixCls}-input-container`}>
          {!props.disabledFormat && (
            <div class={`${prefixCls}-format-select`}>
              {[FORMAT_HEX, FORMAT_HSB, FORMAT_RGB].map(opt => (
                <button
                  key={opt}
                  type="button"
                  class={{
                    [`${prefixCls}-format-btn`]: true,
                    [`${prefixCls}-format-btn-active`]: colorFormat.value === opt,
                  }}
                  onClick={() => triggerFormatChange(opt as any)}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <div class={`${prefixCls}-input`}>
            {steppersNode.value}
            {!props.disabledAlpha && (
              <ColorAlphaInput prefixCls={prefixCls} value={props.value} onChange={props.onChange} />
            )}
          </div>
        </div>
      )
    }
  },
  {
    name: 'ColorInput',
    inheritAttrs: false,
  },
)
