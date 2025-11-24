import type { EmptyEmit } from '../_util/type.ts'
import type { AggregationColor } from './color'
import type { ColorPickerProps, ModeType } from './interface'
import { defineComponent } from 'vue'
import Divider from '../divider'
import PanelPicker from './components/PanelPicker'
import PanelPresets from './components/PanelPresets'
import { PanelPickerContextProvider, PanelPresetsContextProvider } from './context'

export interface ColorPickerPanelProps extends ColorPickerProps {
  mode: ModeType
  onModeChange: (mode: ModeType) => void
  modeOptions: any[]
  value: AggregationColor
  onChange: (value?: AggregationColor, fromPicker?: boolean) => void
  onChangeComplete?: (value: AggregationColor) => void
  activeIndex: number
  onActive: (index: number) => void
  gradientDragging: boolean
  onGradientDragging: (dragging: boolean) => void
  onClear?: () => void
  panelRender?: ColorPickerProps['panelRender']
}

export default defineComponent<
  ColorPickerPanelProps,
  EmptyEmit,
  string
>(
  (props) => {
    const colorPickerPanelPrefix = `${props.prefixCls}-inner`

    const innerPanel = () => (
      <div class={`${colorPickerPanelPrefix}-content`}>
        <PanelPickerContextProvider {...props as any}>
          <PanelPicker />
        </PanelPickerContextProvider>
        {Array.isArray(props.presets) ? <Divider /> : null}
        <PanelPresetsContextProvider {...props as any}>
          <PanelPresets />
        </PanelPresetsContextProvider>
      </div>
    )

    return () => (
      <div class={colorPickerPanelPrefix}>
        {typeof props.panelRender === 'function'
          ? props.panelRender(innerPanel(), {
              components: {
                Picker: PanelPicker,
                Presets: PanelPresets,
              },
            })
          : innerPanel()}
      </div>
    )
  },
  {
    name: 'AColorPickerPanel',
    inheritAttrs: false,
  },
)
