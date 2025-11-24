import type { CSSProperties } from 'vue'
import { clsx } from '@v-c/util'
import { defineComponent, shallowRef, watch } from 'vue'

export interface ColorSteppersProps {
  prefixCls: string
  value?: number
  min?: number
  max?: number
  onChange?: (value: number | null) => void
  className?: string
  formatter?: (value?: number | null) => string | number | undefined
  style?: CSSProperties
}

export default defineComponent<ColorSteppersProps>(
  (props) => {
    const internalValue = shallowRef<number | null>(props.value ?? 0)
    watch(() => props.value, (val) => {
      internalValue.value = typeof val === 'number' ? val : null
    })
    const mergedValue = () => (Number.isNaN(props.value) ? internalValue.value : props.value ?? internalValue.value)

    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      const num = target.value === '' ? null : Number(target.value)
      internalValue.value = num
      props.onChange?.(num)
    }

    return () => (
      <input
        type="number"
        min={props.min ?? 0}
        max={props.max ?? 100}
        value={props.formatter ? props.formatter(mergedValue()) : mergedValue() ?? ''}
        class={clsx(`${props.prefixCls}-steppers`, props.className)}
        style={props.style}
        onInput={onInput}
      />
    )
  },
  {
    name: 'ColorSteppers',
    inheritAttrs: false,
  },
)
