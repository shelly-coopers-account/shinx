import { useEffect } from 'react'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import type { AppContext, AppInitialProps, MyAppProps } from 'next/app'
import type { NextComponentType } from 'next'

import { ModalCollection } from '@components/ModalCollection'
import { useTheme } from 'hooks'
import '@styles/global.css'
import type { GetLayout } from 'next/app'

export const App: NextComponentType<
  AppContext,
  AppInitialProps,
  MyAppProps
> = ({ Component, pageProps }: MyAppProps) => {
  const { theme, themes } = useTheme()
  const getLayout: GetLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    const body = document.body.classList
    themes.forEach((t) => body.contains(t) && body.remove(t))
    body.add(theme)
  }, [theme, themes])

  return (
    <>
      <ModalCollection />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default App
