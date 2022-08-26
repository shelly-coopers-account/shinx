import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { capitalize, forIn } from 'lodash-es'
import type { SubmitHandler } from 'react-hook-form'

import { withModalConfig } from '@hocs'
import { ModalCollection, MODAL_NAMES } from '@components/ModalCollection'
import { Button, ModalProps } from '@components/ui'
import type { Ingredient, TableProps } from 'pages/ingredients/[id]'

export type Inputs = Ingredient
export type Table = Exclude<TableProps['name'], 'All'>

const NewIngredientModal = ({
  name,
  table,
  onClose,
}: Partial<ModalProps> & { name: string; table?: Table }) => {
  const { replace, route } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let dataEncodedToUrl = table ? `table=${table}&` : ''
    forIn(data, (v, k) => {
      dataEncodedToUrl += `${k}=${v}&`
    })

    onClose && onClose()

    replace(`ingredients/${dataEncodedToUrl}`)
  }

  return (
    <form className='flex flex-col gap-5 p-5' onSubmit={handleSubmit(onSubmit)}>
      {(
        ['name', 'carbs', 'protein', 'fat', 'calories'] as Array<keyof Inputs>
      ).map((fieldName, i) => (
        <Fragment key={fieldName}>
          <input
            type='text'
            className='bg-transparent text-secondary first-of-type:text-label'
            placeholder={capitalize(fieldName)}
            autoComplete='off'
            {...register(fieldName, {
              required: true,
              pattern: i === 0 ? /[\s\S]+/g : /^[0-9]*$/,
            })}
          />
          {errors[fieldName] && (
            <span className='text-red'>
              {errors[fieldName]?.type === 'required'
                ? `${capitalize(fieldName)} is required`
                : `For ${fieldName} only numbers are allowed`}
            </span>
          )}
        </Fragment>
      ))}
      <footer className='flex justify-center gap-5 mt-3'>
        {[
          { text: 'Save' },
          { text: 'Clear fields', onClick: () => reset() },
        ].map((props) => (
          <Button
            key={props.text}
            className='first-of-type:bg-blue bg-red text-secondary w-2/5 size-s'
            {...props}
          />
        ))}
      </footer>
    </form>
  )
}

export default (name: string, table?: Table) => {
  const id = MODAL_NAMES.newIngredient
  const component = withModalConfig({
    body: <NewIngredientModal name={name} table={table} />,
    id,
  })

  ModalCollection.open({
    component,
    id,
  })
}
