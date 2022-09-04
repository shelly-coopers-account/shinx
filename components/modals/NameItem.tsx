import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { capitalize } from 'lodash-es'
import type { SubmitHandler } from 'react-hook-form'

import { withModalConfig } from 'hocs'
import { ModalCollection, MODAL_NAMES } from 'components/ModalCollection'
import { Button } from 'components/ui'
import { showNewIngredientModal } from 'components/modals'
import type { ModalProps } from 'components/ui'

type Input = { itemName: string }
export type ItemType = 'ingredient' | 'meal' | 'plan'

const NameItemModal = ({
  i,
  onClose,
}: Partial<ModalProps & { i: ItemType }>) => {
  const { replace } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => {
    onClose && onClose()

    if (i === 'ingredient') {
      showNewIngredientModal(data.itemName)
    } else replace(`new-${i}/${data.itemName}`)
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder={`Give your ${i} a name...`}
        className='bg-transparent p-5 text-secondary'
        autoFocus
        autoComplete='off'
        {...register('itemName', { required: true })}
      />
      {errors.itemName && (
        <span className='p-5 text-red'>{capitalize(i)} name is required</span>
      )}
      <footer className='flex justify-end gap-4 b-t p-5'>
        {[{ text: 'Save' }, { text: 'Cancel', onClick: onClose }].map(
          (props) => (
            <Button
              key={props.text}
              className={`text-secondary size-s w-1/4 first-of-type:bg-blue bg-red`}
              {...props}
            />
          )
        )}
      </footer>
    </form>
  )
}

export default (i: ItemType) => {
  const id = MODAL_NAMES.itemName
  const component = withModalConfig({
    body: <NameItemModal i={i} />,
    id,
  })

  ModalCollection.open({
    component,
    id,
  })
}
