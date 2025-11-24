import type { HSB } from '@v-c/color-picker'
import type { AggregationColor } from '../color'
import { defineComponent, shallowRef } from 'vue'
import { generateColor, getRoundNumber } from '../util'
import ColorSteppers from './ColorSteppers'

export interface ColorHsbInputProps {
  prefixCls: string
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
}

export default defineComponent<ColorHsbInputProps>(
  (props) => {
    // @ts-expect-error this is fine
    const internalValue = shallowRef<AggregationColor>(() => generateColor(props.value || '#000'))
    const hsbValue = () => props.value || internalValue.value

    const handleHsbChange = (step: number | null, type: keyof HSB) => {
      const hsb = hsbValue().toHsb()
      hsb[type] = step || 0
      const genColor = generateColor(hsb)
      internalValue.value = genColor
      props.onChange?.(genColor)
    }

    return () => {
      const prefix = props.prefixCls
      const value = hsbValue()
      const hsb = value.toHsb()
      return (
        <div class={`${prefix}-hsb-input`}>
          <ColorSteppers
            max={359}
            min={0}
            value={getRoundNumber(hsb.h)}
            prefixCls={prefix}
            className={`${prefix}-hsb-input`}
            onChange={step => handleHsbChange(Number(step), 'h')}
          />
          <ColorSteppers
            max={100}
            min={0}
            value={getRoundNumber(hsb.s * 100)}
            prefixCls={prefix}
            className={`${prefix}-hsb-input`}
            onChange={step => handleHsbChange(Number(step) / 100, 's')}
            formatter={v => (v === null || v === undefined ? '' : v)}
          />
          <ColorSteppers
            max={100}
            min={0}
            value={getRoundNumber(hsb.b * 100)}
            prefixCls={prefix}
            className={`${prefix}-hsb-input`}
            onChange={step => handleHsbChange(Number(step) / 100, 'b')}
            formatter={v => (v === null || v === undefined ? '' : v)}
          />
        </div>
      )
    }
  },
  {
    name: 'ColorHsbInput',
    inheritAttrs: false,
  },
)
