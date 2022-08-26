import { createElement } from 'react'
import { useRouter } from 'next/router'
import { capitalize } from 'lodash-es'
import cn from 'classnames'
import type { ReactElement } from 'react'

import { Link } from '@components/ui'
import { Cube, Rocket, Gear, Search } from '@components/icons'
import type { LinkProps } from '@components/ui'

export type UseNavProps = {
  ids: Array<RouteName>
} & Partial<LinkProps>

type RouteName = keyof typeof routes
type NavigationLinks = Array<ReactElement>

export const routes = {
  Home: {
    route: '/',
    i: false,
  },
  Overview: {
    route: '/overview',
    i: <Cube />,
  },
  Finished: {
    route: '/finished',
    i: <Rocket />,
  },
  Settings: {
    route: '/settings',
    i: <Gear />,
  },
  Database: {
    route: '/database',
    i: <Search />,
  },
  'Look up a food': {
    route: '/database',
    i: <Search />,
  },
  'New meal': {
    route: '/new-meal',
    i: '+',
  },
  'New plan': {
    route: '/new-plan',
    i: '+',
  },
}

export default ({
  ids,
  className,
  isize,
  ...props
}: UseNavProps): NavigationLinks => {
  const { pathname } = useRouter()
  const reactElements: NavigationLinks = []

  for (const key in routes) {
    const isActive = pathname === routes[key as RouteName].route

    ids.includes(key as RouteName) &&
      reactElements.push(
        createElement(Link, {
          key,
          to: routes[key as RouteName].route,
          className: cn({ active: isActive }, className),
          before: isize && routes[key as RouteName].i,
          text: capitalize(key),
          isize,
          ...props,
        })
      )
  }

  return reactElements
}
