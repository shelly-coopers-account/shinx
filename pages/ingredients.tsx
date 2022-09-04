import { capitalize } from 'lodash-es'
import { Menu, MenuItem } from '@szhsin/react-menu'

import DashboardLayout from 'components/layouts'
import { useApi } from 'hooks'
import type { Page } from 'next/app'
import type { IngredientTables } from 'lib/types'

export type TableProps = {
  name: 'All' | 'Carbs' | 'Protein' | 'Fat'
  ingredients: IngredientTables[keyof IngredientTables]
}

const IngredientTable = ({ name, ingredients }: TableProps) => (
  <section
    className='bg-secondary shadow rounded-lg flex flex-col p-5'
    aria-label={name}
  >
    <h3>{name}</h3>
    <table className='table-auto mt-3 text-left border-separate border-spacing-y-2'>
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
        {ingredients.length ? ingredients.map((i) => (
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
                <td>{i.calories}</td>
              </tr>
            }
          >
            {['Delete', 'Edit', 'Add to'].map((s) => (
              <MenuItem key={s}>{s}</MenuItem>
            ))}
          </Menu>
        )) : 'None has been added yet.'}
      </tbody>
    </table>
  </section>
)

const IngredientTablesSkeleton = () => (
  <div className='grid grid-cols-2 gap-5 p-8'>
    {['All', 'Carbs', 'Protein', 'Fat'].map((table) => (
      <section
        key={table}
        className='bg-secondary shadow rounded-lg flex flex-col p-5 min-w-1/2'
        aria-label={table}
      >
        <h3>{table}</h3>
        <table className='table-auto mt-3 text-left border-separate border-spacing-y-1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Carbs</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody className='animate-pulse'>
            {[1, 2, 3, 4, 5].map((n) => (
              <tr key={n}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <td key={n}>
                    <div className='h-2 bg-gray rounded my-3 w-4/6' />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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
        (n) => (
          <IngredientTable
            key={n}
            name={capitalize(n) as TableProps['name']}
            ingredients={data[n]}
          />
        )
      )}
    </div>
  )
}

Ingredients.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
Ingredients.getFallback = () => (
  <DashboardLayout>
    <IngredientTablesSkeleton />
  </DashboardLayout>
)

export default Ingredients
