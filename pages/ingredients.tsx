import { capitalize } from 'lodash-es'
import { Menu, MenuItem } from '@szhsin/react-menu'

import DashboardLayout from 'components/layouts'
import { Table, TableSkeleton } from 'components'
import { useApi } from 'hooks'
import { createIngredient } from 'lib/db'
import type { Page } from 'next/app'
import type { Ingredient } from 'lib/types'

type IngredientTables = {
  all: Array<Ingredient>
  carbs: Array<Ingredient>
  protein: Array<Ingredient>
  fat: Array<Ingredient>
}

type IngredientTableProps = {
  name: 'All' | 'Carbs' | 'Protein' | 'Fat'
  ingredients: IngredientTables[keyof IngredientTables]
}

const cols = [
  'Name',
  'Carbs',
  'Protein',
  'Fat',
  'Weight',
  'Calories',
] as Capitalize<keyof Ingredient>[]

export const IngredientTable = ({
  name,
  ingredients,
}: IngredientTableProps) => (
  <Table<typeof cols>
    name={name}
    cols={cols}
    dbDispatcher={createIngredient}
    tbody={ingredients.map((i: Ingredient) => (
      <Menu
        key={i.name}
        transition
        offsetY={10}
        menuButton={
          <tr className='hover:brightness-150 transition-all my-5 cursor-pointer'>
            <td>{i.name}</td>
            <td>{i.carbs}</td>
            <td>{i.protein}</td>
            <td>{i.fat}</td>
            <td>{i.weight}</td>
            <td>{i.calories}</td>
          </tr>
        }
      >
        {['Delete', 'Edit', 'Add to'].map((s) => (
          <MenuItem key={s}>{s}</MenuItem>
        ))}
      </Menu>
    ))}
  />
)

const IngredientTablesSkeleton = () => (
  <div className='grid grid-cols-2 gap-5 p-8'>
    {['All', 'Carbs', 'Protein', 'Fat'].map((table) => (
      <TableSkeleton key={table} name={table} cols={cols} />
    ))}
  </div>
)

const Ingredients: Page = () => {
  const { data } = useApi<IngredientTables>({
    url: '/api/ingredients',
    config: { suspense: true },
  })

  return (
    <div className='grid grid-cols-2 gap-5 p-8'>
      <IngredientTable
        name='All'
        ingredients={[...data['carbs'], ...data['protein'], ...data['fat']]}
      />
      {(['carbs', 'protein', 'fat'] as Array<keyof IngredientTables>).map(
        (s) => (
          <IngredientTable
            key={s}
            name={capitalize(s) as IngredientTableProps['name']}
            ingredients={data[s]}
          />
        )
      )}
    </div>
  )
}

Ingredients.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
Ingredients.getFallback = () => <IngredientTablesSkeleton />

export default Ingredients
