import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { useAuth } from 'lib/auth'

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { loading, user } = useAuth()
  const { push, route } = useRouter()

  useEffect(() => {
    const publicRoutes = ['/login']

    if (!loading && !user && !publicRoutes.includes(route)) push('/login')
  }, [user, loading])

  // return <>{route === '/login' ? children : (user && !loading ? children : 'Loading...')}</>
  return <>{route === '/login' ? children : user && !loading && children}</>
}

export default RouteGuard
