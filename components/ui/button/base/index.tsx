import { createElement, forwardRef, memo } from 'react'
import cn from 'classnames'
import type { Ref, ReactNode } from 'react'

import { Icon } from '@components/ui'
import btn from './btn.module.css'
import type { IconProps } from '@components/ui/icon'
import type { DefaultProps } from '@components/ui/types'

export type ButtonBaseProps = {
  text?: string
  before?: ReactNode
  after?: ReactNode
  isize?: IconProps['size']
} & DefaultProps &
  Record<string, unknown>

const ButtonBase = memo(
  forwardRef(
    (
      {
        as = 'button',
        text,
        children = text,
        className,
        before,
        after,
        isize,
        ...props
      }: ButtonBaseProps,
      ref: Ref<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      const icon = (svg: ReactNode, k: string) =>
        svg && <Icon i={svg} key={k} className={k} size={isize} />
      const content = [
        icon(before, 'i-before'),
        children,
        icon(after, 'i-after'),
      ]

      return createElement(
        as,
        {
          ref,
          className: cn(
            btn.core,
            'hover:brightness-150 transition-all',
            className
          ),
          ...props,
        },
        content
      )
    }
  )
)

export default ButtonBase
