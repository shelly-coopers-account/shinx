import _Link from 'next/link'
import { forwardRef } from 'react'
import type { LinkProps as NextLinkProps } from 'next/link'
import type { Ref } from 'react'

import ButtonBase, { ButtonBaseProps } from '../button/base'

export type LinkProps = {
  to: NextLinkProps['href']
  newTab?: boolean
} & Omit<NextLinkProps, 'href'> &
  ButtonBaseProps

const Link = forwardRef(
  (
    {
      to,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      newTab,
      ...props
    }: LinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => (
    <_Link
      href={to}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <ButtonBase
        as='a'
        href={to}
        target={newTab ? '_blank' : null}
        rel={newTab ? 'noreferrer' : null}
        aria-label={to}
        ref={ref}
        {...props}
      />
    </_Link>
  )
)

export default Link
