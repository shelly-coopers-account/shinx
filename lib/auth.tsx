import Router from 'next/router'
import { useState, useEffect, useContext, createContext } from 'react'
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onIdTokenChanged,
} from 'firebase/auth'
import type { FC, ReactNode } from 'react'
import type { NextOrObserver } from 'firebase/auth'

import { createUser } from './db'
import type { Auth, RawUser } from './types'

const auth = getAuth()
const provider = new GoogleAuthProvider()

const AuthContext = createContext({})

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = (): Auth => {
  return useContext(AuthContext) as Auth
}

function useProvideAuth() {
  const [user, setUser] = useState<Auth['user'] | null>(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser?: RawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(userWithoutToken)
      setUser(user)

      setLoading(false)

      return user
    } else {
      setUser(null)
      setLoading(false)
      return false
    }
  }

  const signinWithGoogle = (redirect: string) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        handleUser(user)
        if (redirect) Router.push(redirect)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  const signout = async () => {
    Router.push('/')

    return signOut(auth).then(() => handleUser())
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(
      auth,
      handleUser as NextOrObserver<RawUser>
    )

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  }
}

const formatUser = async (user: RawUser) => {
  const token = await user.getIdToken()
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  }
}
