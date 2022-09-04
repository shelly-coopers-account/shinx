import { useRouter } from 'next/router'
// import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import { capitalize } from 'lodash-es'
import type { SubmitHandler } from 'react-hook-form'

import { withModalConfig } from 'hocs'
import { ModalCollection, MODAL_NAMES } from 'components/ModalCollection'
import { Button, ModalProps } from 'components/ui'
import { createIngredient } from 'lib/db'
import type { Ingredient } from 'lib/types'

export type Inputs = Omit<Ingredient, 'createdAt'>

const NewIngredientModal = ({ onClose }: Partial<ModalProps>) => {
  const { push, route } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      weight: '100'
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async (ingredient) => {
    const ingredientWithDate = {
      ...ingredient,
      createdAt: new Date().toISOString(),
    }

    await createIngredient(ingredientWithDate)

    // mutate(
    //   '/api/ingredients',
    //   async (data: Array<Ingredient>) => [...data, ingredientWithDate],
    //   false
    // )

    const targetRoute = '/ingredients'
    onClose && onClose()

    if (route !== targetRoute) push(targetRoute)
  }

  return (
    <form className='flex flex-col gap-5 p-5' onSubmit={handleSubmit(onSubmit)}>
      {(
        ['name', 'weight', 'carbs', 'protein', 'fat', 'calories'] as Array<keyof Inputs>
      ).map((fieldName, i) => (
        <label key={fieldName}>
          {capitalize(fieldName)}
          <input
            autoFocus={i === 0}
            className='bg-transparent text-secondary ml-3'
            placeholder={[0, 5].includes(i) ? '' : 'grams'}
            autoComplete='off'
            {...register(fieldName, {
              required: `${capitalize(fieldName)} is required`,
              pattern: i === 0 ? /[\s\S]+/g : /^[0-9]*$/,
            })}
          />
          <ErrorMessage 
            errors={errors} 
            name={fieldName} 
            render={({ message }) => 
              <div className='text-red'>
                {message || `For ${fieldName} only numbers are allowed`}
              </div>
            }
          />
        </label>
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

export default () => {
  const id = MODAL_NAMES.newIngredient
  const component = withModalConfig({
    body: <NewIngredientModal />,
    id,
  })

  ModalCollection.open({
    component,
    id,
  })
}
