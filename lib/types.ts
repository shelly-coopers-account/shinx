import type { User } from 'firebase/auth'

export type RawUser = User
export type FormattedUser = {
  uid: RawUser['uid']
  email: RawUser['email']
  name: RawUser['displayName']
  provider: RawUser['providerData'][0]['providerId']
  photoUrl: RawUser['photoURL']
  token: string
}

export type Auth = {
  user: FormattedUser
  loading: boolean
  signinWithGoogle: (redirect?: string) => void
  signout: (redirect?: string) => void
}

export type Ingredient = {
  name: string
  weight: string
  carbs: string
  protein: string
  fat: string
  calories: string
  createdAt: string
}

export type Meal = {
  name: string
  ingredients: Ingredient[]
  createdAt: string
  carbs: string
  protein: string
  fat: string
  calories: string
}

export type MealsTable = Meal[]
