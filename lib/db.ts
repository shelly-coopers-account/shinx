import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import app from './firebase'

import type { FormattedUser, Ingredient, Meal } from './types'

// database:
const firestore = getFirestore(app)

export function createUser(data: Omit<FormattedUser, 'token'>) {
  const coll = collection(firestore, 'users')
  const document = doc(coll, data.uid)
  return setDoc(document, { ...data }, { merge: true })
}

export function createIngredient(data: Ingredient) {
  const coll = collection(firestore, 'ingredients')
  const document = doc(coll)
  const dataWithDate = {
    ...data,
    createdAt: new Date().toISOString(),
  }
  return setDoc(document, { ...dataWithDate }, { merge: true })
}

export function createMeal(data: Meal) {
  const coll = collection(firestore, 'meals')
  const document = doc(coll)
  return setDoc(document, { ...data }, { merge: true })
}
