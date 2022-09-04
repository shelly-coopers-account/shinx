import { withModalConfig } from 'hocs'
import { ModalCollection, MODAL_NAMES } from 'components/ModalCollection'
import { Button } from 'components/ui'
import { useAuth } from 'lib/auth'

const LoginModal = ({ redirect }: { redirect: string }) => {
  const { signinWithGoogle } = useAuth()

  return (
    <div className='flex flex-col p-5 gap-5 w-3/10'>
      <h2 className='text-secondary'>
        Please log in to unlock full functionality
      </h2>
      <details>
        <summary>Simple calorietracker you always wanted</summary>
      </details>
      <Button text='Log in with Google' onClick={() => signinWithGoogle(redirect)} />
    </div>
  )
}

export default (redirect: string) => {
  const id = MODAL_NAMES.login
  const component = withModalConfig({
    body: <LoginModal redirect={redirect} />,
    id,
  })

  ModalCollection.open({
    component,
    id,
  })
}
