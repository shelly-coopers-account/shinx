import type { Page } from 'next/app'

import DashboardLayout from 'components/layouts'
import { IngredientTable } from './ingredients'
import { useApi } from 'hooks'

const Meals: Page = () => {
  const { data } = useApi({ url: '/api/meals' })

  return (
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
          {ingredients.length ? (
            ingredients.map((i) => (
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
            ))
          ) : (
            <tr>
              <td>None has been added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

Meals.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Meals
