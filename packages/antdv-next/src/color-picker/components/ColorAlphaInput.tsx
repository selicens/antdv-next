import type { AggregationColor } from '../color'
import { defineComponent } from 'vue'
import { generateColor, getRoundNumber } from '../util'
import ColorSteppers from './ColorSteppers'

export interface ColorAlphaInputProps {
  prefixCls: string
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
}

export default defineComponent<ColorAlphaInputProps>(
  (props) => {
    const handleAlphaChange = (step: number | null) => {
      const rgb = props.value?.toHsb() || { h: 0, s: 0, b: 0, a: 1 }
      rgb.a = (step ?? 0) / 100
      const genColor = generateColor(rgb)
      props.onChange?.(genColor)
    }
    return () => {
      const alpha = getRoundNumber((props.value?.toHsb().a || 0) * 100)
      return (
        <ColorSteppers
          min={0}
          max={100}
          value={alpha}
          prefixCls={props.prefixCls}
          className={`${props.prefixCls}-alpha-input`}
          onChange={handleAlphaChange}
        />
      )
    }
  },
  {
    name: 'ColorAlphaInput',
    inheritAttrs: false,
  },
)
