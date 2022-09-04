import { cloneElement } from 'react'

import { ModalCollection, MODAL_NAMES } from 'components/ModalCollection'
import { Modal } from 'components/ui'
import type { ModalProps } from 'components/ui'

export type ModalBodyProps = {
  isVisible: boolean
} & Record<string, unknown>

type WithModalConfigProps = {
  id: MODAL_NAMES
} & Omit<ModalProps, 'onClose'>

const withModalConfig = ({ id, body, ...props }: WithModalConfigProps) => {
  const ModalItem = ({ isVisible, ...modalBodyProps }: ModalBodyProps) => {
    const onClose = () => ModalCollection.close(id)
    const BodyWithAccessToModalActions = cloneElement(body, {
      onClose,
      isVisible,
      ...body.props,
      ...modalBodyProps,
    })
    const modalProps = {
      ...props,
      body: BodyWithAccessToModalActions,
      onClose,
      isVisible,
    }

    return <Modal {...modalProps} />
  }

  ModalItem.displayName = `${id}_modal`
  return ModalItem
}

export default withModalConfig
