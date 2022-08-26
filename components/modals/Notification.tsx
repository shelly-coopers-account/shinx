import { withModalConfig } from '@hocs'
import { ModalCollection, MODAL_NAMES } from '@components/ModalCollection'
import { Button } from '@components/ui'
import type { ModalProps } from '@components/ui'

const NotificationModal = ({
  text,
  onClose,
}: Partial<ModalProps> & { text: string }) => (
  <div className='flex flex-col p-5 gap-5'>
    {text}
    <Button
      text='Got it'
      className='bg-blue text-secondary w-3/5 size-s mx-auto'
      onClick={onClose}
    />
  </div>
)

export default (text: string) => {
  const id = MODAL_NAMES.notification
  const component = withModalConfig({
    body: <NotificationModal text={text} />,
    id,
  })

  ModalCollection.open({
    component,
    id,
  })
}
