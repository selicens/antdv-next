import type { AggregationColor } from '../color'
import { defineComponent, shallowRef, watch } from 'vue'
import { toHexFormat } from '../color'
import { generateColor } from '../util'

export interface ColorHexInputProps {
  prefixCls: string
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
}

const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i
const isHexString = (hex?: string) => hexReg.test(`#${hex}`)

export default defineComponent<ColorHexInputProps>(
  (props) => {
    const hexValue = shallowRef<string | undefined>(
      props.value ? toHexFormat(props.value.toHexString()) : undefined,
    )
    watch(() => props.value, (val) => {
      if (val) {
        hexValue.value = toHexFormat(val.toHexString())
      }
    })
    const handleHexChange = (e: Event) => {
      const originValue = (e.target as HTMLInputElement).value
      const formatted = toHexFormat(originValue)
      hexValue.value = formatted
      if (isHexString(toHexFormat(originValue, true))) {
        props.onChange?.(generateColor(originValue))
      }
    }

    return () => (
      <input
        class={`${props.prefixCls}-hex-input`}
        value={hexValue.value}
        onInput={handleHexChange}
        size={1}
      />
    )
  },
  {
    name: 'ColorHexInput',
    inheritAttrs: false,
  },
)
