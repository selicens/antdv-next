import type { Ref } from 'vue'
import type { Breakpoint } from '../responsiveObserver.ts'
import { computed } from 'vue'
import { useBreakpoint } from '../../grid'
import { responsiveArray } from '../responsiveObserver.ts'

export function convertBreakpointToResponsive<T extends Partial<Record<Breakpoint, any>>>(breakpoints: T): any {
  return {
    ...breakpoints,
    mobile: breakpoints.xs,
    tablet: breakpoints.md,
    laptop: breakpoints.lg,
    desktop: breakpoints.xxl,
  }
}

export function useResponsive() {
  const breakpoints = useBreakpoint()
  const keys = [...responsiveArray, 'mobile', 'tablet', 'laptop', 'desktop'] as const
  type KeyType = typeof keys[number]
  const refs: Record<KeyType, Ref<boolean>> = {
  } as any
  const responsive = computed(() => {
    return convertBreakpointToResponsive(breakpoints.value!)
  })

  for (const key of keys) {
    refs[key] = computed(() => responsive.value[key as keyof typeof responsive.value] || false)
  }

  return refs
}
