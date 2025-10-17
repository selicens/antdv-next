import type { TransitionProps } from 'vue'

export function getTransitionProps(
  name: string,
  options?: Partial<TransitionProps>,
) {
  return {
    name,
    appear: true,
    ...options,
  } as TransitionProps
}
