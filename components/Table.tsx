import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import type { SubmitHandler, Path } from 'react-hook-form'
import type { ReactElement } from 'react'

import { Button } from './ui'

type Cols = Capitalize<string>[]

type TableProps<C extends Cols> = {
  name: string
  cols: C
  tbody: ReactElement[]
  dbDispatcher: (data: Inputs<C>) => Promise<void>
}

type OneOf<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer OneOf
>
  ? OneOf
  : never

type Inputs<C extends Cols> = Record<Uncapitalize<OneOf<C>>, string> // For example: { carbs: 150, protein: 140 }

export const Table = <C extends Cols>({ name, cols, tbody, dbDispatcher }: TableProps<C>) => {
  const [isAdding, setIsAdding] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs<C>>()

  const onSubmit: SubmitHandler<Inputs<C>> = async (inputs) => {


    await dbDispatcher(inputs)
  }

  return (
    <section
      className='bg-secondary shadow rounded-lg flex flex-col p-5'
      aria-label={name}
    >
      <h3>{name}</h3>
      <table className='table-auto mt-3 text-left border-separate border-spacing-y-2'>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody?.length ? (
            tbody
          ) : (
            <tr>
              <td>None has been added yet.</td>
            </tr>
          )}
          {isAdding && (
            <tr>
              {cols.map((c, i) => (
                <td key={c} className='relative'>
                  <input
                    autoFocus={i === 0}
                    placeholder={c}
                    autoComplete='off'
                    className='bg-transparent text-secondary w-1/2'
                    {...register(c.toLowerCase() as Path<Inputs<C>>, {
                      required: 'Required',
                      pattern: i === 0 ? /[\s\S]+/g : /^[0-9]*$/,
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={c.toLowerCase()}
                    render={({ message }) => (
                      <div className='text-red'>
                        {message || 'Only numbers'}
                      </div>
                    )}
                  />
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
      <footer className='my-5'>
        {isAdding && (
          <div className='flex gap-4'>
            {['Submit the ingredient', 'Cancel'].map((s, i) => (
              <Button
                key={s}
                text={s}
                className='first-of-type:bg-blue bg-red size-s text-secondary w-1/2'
                onClick={
                  i === 0
                    ? handleSubmit(onSubmit)
                    : () => {
                        reset()
                        setIsAdding(false)
                      }
                }
              />
            ))}
          </div>
        )}
        <Button
          text='+ Add an ingredient'
          className='size-s size-x-0 justify-start w-full'
          onClick={() => setIsAdding(true)}
        />
      </footer>
    </section>
  )
}

export const TableSkeleton = ({ name, cols }: { name: string, cols: Cols }) => (
  <section
    key={name}
    className='bg-secondary shadow rounded-lg flex flex-col p-5 min-w-1/2'
    aria-label={name}
  >
    <h3>{name}</h3>
    <table className='table-auto mt-3 text-left border-separate border-spacing-y-1'>
      <thead>
        <tr>
          {cols.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody className='animate-pulse'>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <tr key={n}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <td key={n}>
                <div className='h-2 bg-gray rounded my-3 w-4/6' />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)
