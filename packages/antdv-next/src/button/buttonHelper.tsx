import type { CSSProperties, VNodeChild } from 'vue'
import { cloneVNode, createVNode, Fragment, isVNode, Text } from 'vue'
import { PresetColors } from '../theme/interface'

const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/
export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)
export function isUnBorderedButtonVariant(type?: ButtonVariantType) {
  return type === 'text' || type === 'link'
}

function splitCNCharsBySpace(
  child: VNodeChild,
  needInserted: boolean,
  style?: CSSProperties,
  className?: string,
): VNodeChild {
  if (child === null || child === undefined) {
    return child
  }

  const SPACE = needInserted ? ' ' : ''

  if (typeof child === 'string' || typeof child === 'number') {
    const text = String(child)
    const content = isTwoCNChar(text) ? text.split('').join(SPACE) : text
    return createVNode('span', {
      class: className,
      style,
    }, content)
  }

  if (isVNode(child)) {
    if (child.type === Text) {
      const text = String(child.children ?? '')
      const content = isTwoCNChar(text) ? text.split('').join(SPACE) : text
      return createVNode('span', { key: (child as any).key, class: className, style }, content)
    }

    if (child.type === Fragment) {
      return createVNode('span', { key: (child as any).key, class: className, style }, child.children)
    }

    if (typeof child.type === 'string' && typeof child.children === 'string' && isTwoCNChar(child.children)) {
      return cloneVNode(child, { class: className, style }, (child as any).children?.split('')?.join?.(SPACE))
    }

    return child
  }

  return child
}

function isPureTextChild(child: VNodeChild): boolean {
  if (typeof child === 'string' || typeof child === 'number') {
    return true
  }

  if (isVNode(child)) {
    return child.type === Text && typeof child.children === 'string'
  }

  return false
}

function getChildText(child: VNodeChild): string {
  if (typeof child === 'string' || typeof child === 'number') {
    return String(child)
  }

  if (isVNode(child) && child.type === Text && typeof child.children === 'string') {
    return child.children
  }

  return ''
}

export function spaceChildren(
  children: VNodeChild[],
  needInserted: boolean,
  style?: CSSProperties,
  className?: string,
): VNodeChild[] {
  const childList: VNodeChild[] = []
  let isPrevChildPure = false

  children.forEach((child) => {
    const isCurrentChildPure = isPureTextChild(child)
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1
      const lastChild = childList[lastIndex]
      const lastText = getChildText(lastChild)
      const currentText = getChildText(child)

      if (lastText !== '' && currentText !== '') {
        childList[lastIndex] = `${lastText}${currentText}`
      }
      else {
        childList.push(child)
      }
    }
    else {
      childList.push(child)
    }

    isPrevChildPure = isCurrentChildPure
  })

  return childList.map(item => splitCNCharsBySpace(item, needInserted, style, className))
}

const _ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const
export type ButtonType = (typeof _ButtonTypes)[number]

const _ButtonShapes = ['default', 'circle', 'round'] as const
export type ButtonShape = (typeof _ButtonShapes)[number]

const _ButtonHTMLTypes = ['submit', 'button', 'reset'] as const
export type ButtonHTMLType = (typeof _ButtonHTMLTypes)[number]

export const _ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link',
] as const
export type ButtonVariantType = (typeof _ButtonVariantTypes)[number]

export const _ButtonColorTypes = ['default', 'primary', 'danger', ...PresetColors] as const

export type ButtonColorType = (typeof _ButtonColorTypes)[number]
