import { forwardRef } from 'react'
import type { Ref, MouseEventHandler } from 'react'

import ButtonBase from './base'
import type { ButtonBaseProps } from './base'

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
} & ButtonBaseProps

const Button = forwardRef(
  ({ ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => (
    <ButtonBase ref={ref} {...props} />
  )
)

export default Button
