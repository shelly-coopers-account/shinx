import { useState, useMemo, useCallback, useEffect } from 'react'

type Themes = 'dark' | 'light'

export default () => {
  const [theme, setTheme] = useState<Themes>('dark')

  const toggleTheme = useCallback(
    (to = (theme === 'dark' ? 'light' : 'dark') as Themes) => {
      localStorage.setItem('theme', to)
      setTheme(to)
    },
    [theme]
  )

  useEffect(() => {
    const ls = localStorage.getItem('theme') as Themes
    if (!ls) localStorage.setItem('theme', 'dark')
  }, [])

  return useMemo(
    () => ({
      theme,
      themes: ['dark', 'light'],
      toggleTheme,
    }),
    [theme, toggleTheme]
  )
}
