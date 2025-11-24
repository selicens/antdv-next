import type { ComponentPublicInstance } from 'vue'
import { Color as VcColor, Picker as VcPicker, Slider as VcSlider } from '@v-c/color-picker'
import { clsx } from '@v-c/util'
import { defineComponent, shallowRef, watch } from 'vue'
import Segmented from '../../../segmented'
import { AggregationColor } from '../../color'
import { usePanelPickerContext } from '../../context'
import { genAlphaColor, generateColor } from '../../util'
import ColorClear from '../ColorClear'
import ColorInput from '../ColorInput'

const HUE_COLORS = [
  { color: 'rgb(255, 0, 0)', percent: 0 },
  { color: 'rgb(255, 255, 0)', percent: 17 },
  { color: 'rgb(0, 255, 0)', percent: 33 },
  { color: 'rgb(0, 255, 255)', percent: 50 },
  { color: 'rgb(0, 0, 255)', percent: 67 },
  { color: 'rgb(255, 0, 255)', percent: 83 },
  { color: 'rgb(255, 0, 0)', percent: 100 },
]

function createColorInstance(color: AggregationColor) {
  return new VcColor(color?.toRgbString?.() || '')
}

export default defineComponent(
  () => {
    const pickerContext = usePanelPickerContext()
    const pickerRef = shallowRef<ComponentPublicInstance>()

    const pickerColor = shallowRef<AggregationColor | null>(pickerContext.value?.value)
    watch(
      () => pickerContext.value?.value,
      (val) => {
        pickerColor.value = val as any
      },
      { immediate: true },
    )

    const colors = () => pickerContext.value?.value?.getColors?.() ?? []
    const isSingle = () => !(pickerContext.value?.value?.isGradient?.())
    const activeColor = () => {
      const list = colors()
      if (isSingle())
        return pickerContext.value!.value
      return list[pickerContext.value?.activeIndex || 0]?.color ?? pickerContext.value!.value
    }

    const fillColor = (nextColor: AggregationColor, info?: { type?: 'hue' | 'alpha', value?: number }) => {
      let submitColor = generateColor(nextColor)
      if (pickerContext.value?.value?.cleared) {
        const rgb = submitColor.toRgb()
        if (!rgb.r && !rgb.g && !rgb.b && info) {
          submitColor = new AggregationColor({
            h: info.type === 'hue' ? info.value : 0,
            s: 1,
            b: 1,
            a: info.type === 'alpha' ? (info.value ?? 0) / 100 : 1,
          } as any)
        }
        else {
          submitColor = genAlphaColor(submitColor)
        }
      }
      if (pickerContext.value?.mode === 'single' || isSingle()) {
        return submitColor
      }
      const nextColors = [...colors()]
      const idx = pickerContext.value?.activeIndex || 0
      ;(nextColors as any)[idx] = { ...nextColors[idx], color: submitColor }
      return new AggregationColor(nextColors)
    }

    const onPickerChange = (colorValue: any, _info?: { type?: 'hue' | 'alpha', value?: number }) => {
      const nextColor = fillColor(generateColor(colorValue), _info)
      // @ts-expect-error this is fine
      pickerColor.value = nextColor?.isGradient?.()
        ? nextColor.getColors()[pickerContext.value?.activeIndex || 0]?.color
        : nextColor
      pickerContext.value?.onChange?.(nextColor, true)
    }

    const onPickerComplete = (colorValue: any, info?: { type?: 'hue' | 'alpha', value?: number }) => {
      pickerContext.value?.onChangeComplete?.(fillColor(generateColor(colorValue), info))
    }

    const onInputChange = (colorValue: AggregationColor) => {
      pickerContext.value?.onChange?.(fillColor(colorValue))
    }

    return () => {
      const {
        prefixCls,
        allowClear,
        disabledAlpha,
        mode,
        onModeChange,
        modeOptions,
        disabled,
        onClear,
        format,
        onFormatChange,
        disabledFormat,
      } = pickerContext.value!
      const operationNode = (() => {
        const showMode = (modeOptions?.length || 0) > 1
        if (!allowClear && !showMode)
          return null
        return (
          <div class={`${prefixCls}-operation`}>
            {showMode && (
              <Segmented size="small" options={modeOptions} value={mode} onChange={val => onModeChange(val as any)} />
            )}
            {allowClear && (
              <ColorClear
                prefixCls={prefixCls}
                value={pickerContext.value?.value}
                disabled={disabled}
                onChange={(clearColor) => {
                  pickerContext.value?.onChange?.(clearColor)
                  onClear?.()
                }}
              />
            )}
          </div>
        )
      })()

      const active = activeColor()
      const vcColor = createColorInstance(active)
      const hue = active.toHsb().h
      const alpha = Math.round((active.toHsb().a ?? 0) * 100)

      return (
        <>
          {operationNode}
          <div class={`${prefixCls}-picker`}>
            <VcPicker
              ref={pickerRef}
              color={vcColor}
              prefixCls={prefixCls}
              disabled={disabled}
              onChange={(c: VcColor, info: any) => onPickerChange(c, info)}
              onChangeComplete={(c: VcColor, info: any) => onPickerComplete(c, info)}
            />
            <div class={`${prefixCls}-slider-container`}>
              <div class={clsx(`${prefixCls}-slider-group`, { [`${prefixCls}-slider-group-disabled-alpha`]: disabledAlpha })}>
                <VcSlider
                  prefixCls={prefixCls}
                  disabled={!!disabled}
                  colors={HUE_COLORS}
                  min={0}
                  max={359}
                  value={hue}
                  type="hue"
                  color={vcColor}
                  onChange={(v: number) => onPickerChange(new AggregationColor(vcColor.setHue(v)), { type: 'hue', value: v })}
                  onChangeComplete={(v: number) => onPickerComplete(new AggregationColor(vcColor.setHue(v)), { type: 'hue', value: v })}
                />
                {!disabledAlpha && (
                  <VcSlider
                    prefixCls={prefixCls}
                    disabled={!!disabled}
                    colors={[
                      { percent: 0, color: 'rgba(255, 0, 4, 0)' },
                      { percent: 100, color: 'rgba(255, 0, 4, 1)' },
                    ]}
                    min={0}
                    max={100}
                    value={alpha}
                    type="alpha"
                    color={vcColor}
                    onChange={(v: number) => onPickerChange(new AggregationColor(vcColor.setA(v / 100)), { type: 'alpha', value: v })}
                    onChangeComplete={(v: number) => onPickerComplete(new AggregationColor(vcColor.setA(v / 100)), { type: 'alpha', value: v })}
                  />
                )}
              </div>
            </div>
          </div>
          <ColorInput
            value={active}
            onChange={onInputChange}
            prefixCls={prefixCls}
            disabledAlpha={disabledAlpha}
            format={format}
            onFormatChange={onFormatChange}
            disabledFormat={disabledFormat}
          />
        </>
      )
    }
  },
  {
    name: 'ColorPanelPicker',
    inheritAttrs: false,
  },
)
