import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

declare module 'next/app' {
  type GetLayout = (page: ReactNode) => ReactNode
  type GetFallback = () => ReactNode
  type Page<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout
    getFallback?: GetFallback
  }
  type MyAppProps<P = {}> = AppProps<P> & {
    Component: Page<P>
  }
}
