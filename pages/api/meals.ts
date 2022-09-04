import type { NextApiRequest, NextApiResponse } from 'next'

import db from 'lib/firebase-admin'
import type { Meal } from 'lib/types'

type MealWithId = Meal & { id: string }

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const ref = db.collection('meals')

    const snapshot = await ref.get()
    const meals: MealWithId[] = []

    snapshot.forEach((doc) => {
      meals.push({ id: doc.id, ...doc.data() } as MealWithId)
    })

    res.status(200).json(meals)
  } catch (err) {
    return { err }
  }
}
