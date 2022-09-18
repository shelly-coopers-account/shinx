import { Suspense } from 'react'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import type { AppContext, AppInitialProps, MyAppProps } from 'next/app'
import type { NextComponentType } from 'next'

import AuthProvider from 'lib/auth'
import { ModalCollection } from 'components/ModalCollection'
import { RouteGuard } from 'components'
import 'styles/global.css'
import type { GetLayout, GetFallback } from 'next/app'

export const App: NextComponentType<
  AppContext,
  AppInitialProps,
  MyAppProps
> = ({ Component, pageProps }: MyAppProps) => {
  const getLayout: GetLayout = Component.getLayout || ((page) => page)
  const getFallback: GetFallback =
    Component.getFallback || (() => <>Loading...</>)

  return (
    <AuthProvider>
      <ModalCollection />
      <Suspense fallback={getLayout(getFallback())}>
        <RouteGuard>{getLayout(<Component {...pageProps} />)}</RouteGuard>
      </Suspense>
    </AuthProvider>
  )
}

export default App
