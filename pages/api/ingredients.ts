import { omit, invertBy } from 'lodash-es'
import type { NextApiRequest, NextApiResponse } from 'next'

import db from 'lib/firebase-admin'
import type { Ingredient } from 'lib/types'

type IngredientWithId = Ingredient & { id: string }
type IngredientTables = {
  carbs: IngredientWithId[]
  protein: IngredientWithId[]
  fat: IngredientWithId[]
}

const format = (allIngredients: IngredientWithId[]) => {
  function assignTable(i: IngredientWithId) {
    const ingredientObjFlipped = omit(
      invertBy(omit(i, ['name', 'calories', 'id', 'createdAt', 'weight'])),
      ['undefined']
    )
    const biggestMacronutrient = Math.max(
      ...Object.keys(ingredientObjFlipped).map((v) => Number(v))
    )
    const tableBasedOnBiggest = ingredientObjFlipped[biggestMacronutrient][0]

    return tableBasedOnBiggest as 'carbs' | 'protein' | 'fat'
  }

  const tables: IngredientTables = { carbs: [], protein: [], fat: [] }

  allIngredients.forEach((i) => tables[assignTable(i)].push(i))

  return tables
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const ref = db.collection('ingredients')

    const snapshot = await ref.get()
    const allIngredients: IngredientWithId[] = []

    snapshot.forEach((doc) => {
      allIngredients.push({ id: doc.id, ...doc.data() } as IngredientWithId)
    })

    res.status(200).json(format(allIngredients))
  } catch (err) {
    return { err }
  }
}
