import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { capitalize } from 'lodash-es'
import {
  Menu,
  MenuItem,
  ControlledMenu,
  useMenuState,
} from '@szhsin/react-menu'
import type { ReactNode } from 'react'

import { Link, Button } from 'components/ui'
import { Logo, Cube, Rocket, Gear, Search } from 'components/icons'
import {
  showNewIngredientModal,
  showNotificationModal,
} from 'components/modals'
import { useAuth } from 'lib/auth'

type RootLayoutProps = {
  children: ReactNode
}

const Nav = () => {
  const finishedItemsRef = useRef(null)
  const [finidhedItemsMenu, toggleMenu] = useMenuState({ transition: true })
  const { route } = useRouter()

  const { user, signout } = useAuth()

  const createItem = (i: 'ingredient' | 'meal' | 'plan') =>
    route.includes('new')
      ? showNotificationModal(
          "You're in the middle of creating an item. Please terminate this first."
        )
      : showNewIngredientModal()

  return (
    <nav className='flex flex-col bg-secondary fixed top-0 left-0 p-4 w-64 h-[100vh] z-layout'>
      <header className='b-b py-4'>
        <Link
          to='/'
          before={<Logo />}
          text='Shinx'
          isize={30}
          className='text-label text-secondary justify-start w-full size-0'
        />
      </header>
      <ul>
        {[
          { text: 'Overview', before: <Cube />, to: '/overview' },
          {
            text: 'Finished items',
            before: <Rocket />,
            onMouseEnter: () => toggleMenu(true),
            ref: finishedItemsRef,
            ...finidhedItemsMenu,
          },
          { text: 'Settings', before: <Gear />, to: '/settings' },
          { text: 'Database', before: <Search />, to: '/database' },
        ].map((props) => {
          const p = {
            ...props,
            className: 'w-full justify-start size-x-0',
            isize: 35,
          }

          return (
            <li key={props.text}>
              {props.to ? <Link {...p} /> : <Button {...p} />}
            </li>
          )
        })}
        <ControlledMenu
          {...finidhedItemsMenu}
          anchorRef={finishedItemsRef}
          onMouseLeave={() => toggleMenu(false)}
          onClose={() => toggleMenu(false)}
          direction='right'
        >
          {['ingredients', 'meals', 'plans'].map((s) => (
            <MenuItem key={s}>
              <Link text={capitalize(s)} to={`/${s}`} className='size-0' />
            </MenuItem>
          ))}
        </ControlledMenu>
        <li className='b-t mt-5'>
          {[
            {
              text: '+ New ingredient',
              onClick: () => createItem('ingredient'),
            },
            { text: '+ New meal', onClick: () => createItem('meal') },
            { text: '+ New plan', onClick: () => createItem('plan') },
          ].map((props) => (
            <Button
              key={props.text}
              className='p-0 w-full justify-start'
              {...props}
            />
          ))}
        </li>
      </ul>
      <footer className='mt-auto b-t py-4'>
        <Menu
          menuButton={
            <Button className='w-full px-0 justify-start gap-4'>
              <Image
                src={user?.photoUrl || '/images/person.jpeg'}
                height={50}
                width={50}
                className='rounded-full'
              />
              {user?.name}
            </Button>
          }
          transition
          offsetY={10}
        >
          {['Sign out', 'Save Session'].map((s, i) => (
            <MenuItem key={s} onClick={i === 0 ? () => signout() : () => null}>
              {s}
            </MenuItem>
          ))}
        </Menu>
      </footer>
    </nav>
  )
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <>
    <Nav />
    <div className='ml-64'>{children}</div>
  </>
)

export default RootLayout
