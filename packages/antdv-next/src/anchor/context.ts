import type { InjectionKey, Ref } from 'vue'
import type { SemanticClassNames, SemanticStyles } from '../_util/hooks/useMergeSemantic.ts'
import type { AntAnchor, SemanticName } from './Anchor'
import { inject, provide } from 'vue'

export type AnchorContextType = Pick<AntAnchor, 'onClick' | 'unregisterLink' | 'registerLink' | 'scrollTo'> & {
  activeLink: Ref<string>
  direction: Ref<AntAnchor['direction'] | undefined>
  classes: Ref<SemanticClassNames<SemanticName>>
  styles: Ref<SemanticStyles<SemanticName>>
}

const AnchorContextKey: InjectionKey<AnchorContextType> = Symbol('AnchorContext')

export function useAnchorProvider(ctx: AnchorContextType) {
  provide(AnchorContextKey, ctx)
}

export function useAnchorContext() {
  return inject(AnchorContextKey, undefined)
}
