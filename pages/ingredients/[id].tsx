import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { invertBy, fromPairs, omit, capitalize } from 'lodash-es'
import { Menu, MenuItem } from '@szhsin/react-menu'

import DashboardLayout from '@components/layouts'
import type { Page } from 'next/app'
import { Button } from '@components/ui'

export type TableProps = {
  name: 'All' | 'Carbs' | 'Protein' | 'Fat'
  ingredients: DB['carbs'] | DB['protein'] | DB['fat']
}

export type Ingredient = {
  name: string
  carbs: string
  protein: string
  fat: string
  calories: string
}

const IngredientTable = ({ name, ingredients }: TableProps) => (
  <section
    className='bg-secondary shadow rounded-lg flex flex-col mt-5 p-5 w-1/2'
    aria-label={name}
  >
    <h3>{name}</h3>
    <table className='table-auto mt-3 text-left'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Carbs</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Calories</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((i) => (
          <tr key={i.name}>
            <td>
              <Menu
                menuButton={
                  <Button text={i.name} className='size-s size-x-0' />
                }
                transition
              >
                {['Delete', 'Edit'].map((s) => (
                  <MenuItem key={s}>{s}</MenuItem>
                ))}
              </Menu>
            </td>
            <td>{i.carbs}</td>
            <td>{i.protein}</td>
            <td>{i.fat}</td>
            <td>{i.calories}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)

// temp
type DB = {
  carbs: Ingredient[]
  protein: Ingredient[]
  fat: Ingredient[]
}

const Ingredients: Page = () => {
  const {
    query: { id },
  } = useRouter()
  const [db, setDb] = useState<DB>({ carbs: [], protein: [], fat: [] }) // temp

  useEffect(() => {
    if (id && id!.includes('name')) {
      const getNewlyCreatedIngFromUrl = decodeURI(id as string)
      const ingParsedToObj = fromPairs(
        getNewlyCreatedIngFromUrl.split('&').map((s) => s.split('='))
      )
      // Get table name to assign new ingredient to based on biggest macronutrient
      const ingObjFlipped = omit(
        invertBy(omit(ingParsedToObj, ['name', 'calories'])),
        ['undefined']
      )
      const biggestMacronutrient = Math.max(
        ...Object.keys(ingObjFlipped).map((v) => Number(v))
      )
      const tableBasedOnBiggest = ingObjFlipped[
        biggestMacronutrient
      ][0] as keyof DB

      setDb({
        ...db,
        [tableBasedOnBiggest]: [...db[tableBasedOnBiggest], ingParsedToObj],
      })
    }
  }, [id])

  return (
    <div className='p-8'>
      <IngredientTable
        name='All'
        ingredients={[...db['carbs'], ...db['protein'], ...db['fat']]}
      />
      {(['carbs', 'protein', 'fat'] as Array<keyof DB>).map((n) => (
        <IngredientTable
          key={n}
          name={capitalize(n) as TableProps['name']}
          ingredients={db[n]}
        />
      ))}
    </div>
  )
}

Ingredients.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Ingredients
