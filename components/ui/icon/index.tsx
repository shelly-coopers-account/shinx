import { forwardRef } from 'react'
import cn from 'classnames'
import type { ReactNode, Ref } from 'react'

import icon from './icon.module.css'
import type { DefaultProps } from 'components/ui/types'

export type IconProps = {
  i?: ReactNode
  size?: number
} & DefaultProps

const Icon = forwardRef(
  (
    { i, size = 16, className, ...props }: IconProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      className={cn(icon.core, { [`size-${size}`]: Boolean(size) }, className)}
      ref={ref}
      {...props}
    >
      {i}
      <style jsx global>{`
        .size-${size} *,
        .size-${size} * > * {
          width: ${size / 16 + 'em'} !important;
          height: ${size / 16 + 'em'} !important;
          transition: 0.5s ease;
        }
      `}</style>
    </span>
  )
)

export default Icon
