import { capitalize } from 'lodash-es'
import { Menu, MenuItem } from '@szhsin/react-menu'

import DashboardLayout from 'components/layouts'
import { Table, TableSkeleton } from 'components'
import { useApi } from 'hooks'
import type { Page } from 'next/app'
import type { Meal } from 'lib/types'

type MealTables = {
  all: Meal[]
  [key: string]: Meal[]
}

type MealTableProps = {
  name: string
  meals: Meal[]
}

const cols = ['Name', 'Ingredients', 'Carbs', 'Protein', 'Fat', 'Calories']

export const MealTable = ({ name, meals }: MealTableProps) => (
  <Table
    name={name}
    cols={cols}
    tbody={meals?.map((i) => (
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
        {['See ingredients', 'Delete', 'Edit', 'Add to'].map((s) => (
          <MenuItem key={s}>{s}</MenuItem>
        ))}
      </Menu>
    ))}
  />
)

const MealTablesSkeleton = () => (
  <div className='grid grid-cols-2 gap-5 p-8'>
    {['All'].map((table) => (
      <TableSkeleton key={table} name={table} cols={cols} />
    ))}
  </div>
)

const Meals: Page = () => {
  const { data } = useApi<MealTables>({
    url: '/api/meals',
    config: { suspense: true },
  })

  return (
    <div className='grid grid-cols-2 gap-5 p-8'>
      <MealTable name='All' meals={data.all} />
      {Object.keys(data).map((table) => (
        <MealTable
          key={table}
          name={capitalize(table) as MealTableProps['name']}
          meals={data[table]}
        />
      ))}
    </div>
  )
}

Meals.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
Meals.getFallback = () => <MealTablesSkeleton />

export default Meals
