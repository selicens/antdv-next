import type { Ref } from 'vue'
import type { AggregationColor } from '../color'
import { clsx } from '@v-c/util'
import { computed, defineComponent, reactive, ref } from 'vue'
import { usePanelPresetsContext } from '../context'
import { generateColor } from '../util'

export default defineComponent(
  () => {
    const presetsContext = usePanelPresetsContext()
    const openMap = reactive<Record<string, Ref<boolean>>>({})
    const getOpen = (key: string, defaultOpen = true) => {
      if (!openMap[key]) {
        openMap[key] = ref(defaultOpen)
      }
      return openMap[key]
    }

    const onClickColor = (color: string | AggregationColor) => {
      presetsContext.value?.onChange?.(generateColor(color))
    }

    const prefix = computed(() => `${presetsContext.value?.prefixCls}-presets`)

    return () => {
      const { presets, value } = presetsContext.value!
      if (!Array.isArray(presets) || !presets.length)
        return null
      return (
        <div class={prefix.value}>
          {presets.map((preset, idx) => {
            const openRef = getOpen(String(preset.key ?? idx), preset.defaultOpen ?? true)
            return (
              <div class={`${prefix.value}-item`} key={preset.key ?? idx}>
                <div class={`${prefix.value}-label`} onClick={() => (openRef.value = !openRef.value)}>
                  {preset.label}
                  <span class={`${prefix.value}-collapse-indicator`}>{openRef.value ? '-' : '+'}</span>
                </div>
                {openRef.value && (
                  <div class={`${prefix.value}-colors`}>
                    {preset.colors.map((color, index) => {
                      const agg = generateColor(color)
                      return (
                        <div
                          key={index}
                          class={clsx(`${prefix.value}-color`, {
                            [`${prefix.value}-color-active`]: agg.equals(value),
                          })}
                          style={{ background: agg.toCssString() }}
                          onClick={() => onClickColor(color)}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )
    }
  },
  {
    name: 'ColorPanelPresets',
    inheritAttrs: false,
  },
)
