import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import format from 'date-fns/format'
import cn from 'classnames'
import type { SubmitHandler } from 'react-hook-form'

import DashboardLayout from 'components/layouts'
import { Button, Link } from 'components/ui'
import { SearchBar } from 'components'
import type { Page } from 'next/app'
import type { ButtonProps, LinkProps } from 'components/ui'

type Input = {
  searchQuery: string
}

const Database: Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => null

  return (
    <div className='flex flex-col p-8'>
      <section className='flex flex-col mb-[3rem]' aria-label='Food name'>
        <h2 className='mb-5'>Food name</h2>
        {['Carbs', 'Protein', 'Fat', 'Calories'].map((s) => (
          <div
            key={s}
            className='bg-secondary rounded-lg shadow mb-3 p-5 w-1/5'
          >
            {s}: 17
          </div>
        ))}
      </section>
      <SearchBar
        className='max-w-[70%] min-w-[18.75rem] w-2/5'
        {...register('searchQuery')}
      />
    </div>
  )
}

Database.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Database
