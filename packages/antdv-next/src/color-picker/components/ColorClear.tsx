import { CloseOutlined } from '@antdv-next/icons'
import { clsx } from '@v-c/util'
import { defineComponent } from 'vue'
import { AggregationColor } from '../color'

export interface ColorClearProps {
  prefixCls: string
  value?: AggregationColor
  disabled?: boolean
  onChange?: (color: AggregationColor) => void
}

export default defineComponent<ColorClearProps>(
  (props) => {
    const handleClear = () => {
      if (props.disabled)
        return
      props.onChange?.(new AggregationColor(''))
    }
    return () => {
      const className = `${props.prefixCls}-clear`
      return (
        <button
          type="button"
          class={clsx(className, { [`${className}-disabled`]: props.disabled })}
          onClick={handleClear}
        >
          <CloseOutlined />
        </button>
      )
    }
  },
  {
    name: 'ColorClear',
    inheritAttrs: false,
  },
)
