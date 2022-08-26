import type { FC, ReactElement } from 'react'

export type ModalProps = {
  title?: string
  body: ReactElement
  onClose: () => void
  isStatic?: boolean
  isVisible?: boolean
}

const Backdrop = ({ ...props }) => (
  <div
    className='
    absolute 
    top-0 
    left-0 
    w-full 
    h-full 
    z-modal
    bg-secondary
    opacity-90
    '
    {...props}
  />
)

const Modal: FC<ModalProps> = ({
  title,
  body,
  onClose,
  isStatic,
  isVisible,
  ...props
}: ModalProps) => (
  <div
    className='
      absolute
      flex 
      justify-center 
      items-center
      min-h-[100vh] 
      min-w-[100vw] 
      overflow-hidden 
      transition-all'
    {...props}
  >
    <Backdrop onClick={isStatic ? () => null : onClose} />
    <div className='flex flex-col w-[31.25rem] bg-primary rounded-lg z-modal'>
      {title && (
        <span className='p-8 text-title-3 flex items-center text-secondary'>
          {title}
        </span>
      )}
      {body}
    </div>
  </div>
)

export default Modal
