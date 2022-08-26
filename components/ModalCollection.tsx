import React from 'react'

export type OnOpen = Omit<ModalItem, 'isVisible'>

type ModalItem = {
  component: React.ComponentClass<any> | React.FC<any>
  id: string
  props?: Record<string, unknown>
  isVisible: boolean
}

type State = Readonly<{ [id: string]: ModalItem }>

export enum MODAL_NAMES {
  itemName = 'itemName',
  newIngredient = 'newIngredient',
  notification = 'notification',
}

export class ModalCollection extends React.Component<
  Record<string, unknown>,
  State
> {
  static ref? = null as ModalCollection | null
  readonly state: State = {}

  componentDidMount() {
    ModalCollection.ref = this
  }

  componentWillUnmount() {
    delete ModalCollection.ref
  }

  static open = ({ component, id, props }: OnOpen) => {
    const reference = ModalCollection.ref
    const modalId = id || (component.displayName as string)

    if (reference) {
      reference.setState({
        [modalId]: { component, props, id: modalId, isVisible: true },
      })
    }
  }

  static close = (id: string) => {
    const reference = ModalCollection.ref
    if (reference && id) {
      reference.setState((state) => ({
        [id]: { ...state[id], isVisible: false },
      }))
    }
  }

  render() {
    const state = ModalCollection.ref?.state
    const modalIds = state && Object.keys(state)

    return (
      <>
        {state && modalIds?.length
          ? modalIds.map((itemId) => {
              const { component, props, isVisible, id } = state[itemId]
              const ModalElement = component
              return isVisible ? (
                <ModalElement key={id} {...props} isVisible />
              ) : null
            })
          : null}
      </>
    )
  }
}
