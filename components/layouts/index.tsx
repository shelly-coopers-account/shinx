import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import {
  Menu,
  MenuItem,
  ControlledMenu,
  useMenuState,
} from '@szhsin/react-menu'
import type { ReactNode } from 'react'

import { Link, Button } from '@components/ui'
import { Logo, Cube, Rocket, Gear, Search } from '@components/icons'
import { showNameItemModal, showNotificationModal } from '@components/modals'
import type { ItemType } from '@components/modals/NameItem'

type RootLayoutProps = {
  children: ReactNode
}

const Nav = () => {
  const finishedItemsRef = useRef(null)
  const [FIMenu, toggleMenu] = useMenuState({ transition: true })
  const { route } = useRouter()

  const createItem = (i: ItemType) =>
    route.includes('new')
      ? showNotificationModal(
          "You're in the middle of creating an item. Please terminate this first."
        )
      : showNameItemModal(i)

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
            ...FIMenu,
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
          {...FIMenu}
          anchorRef={finishedItemsRef}
          onMouseLeave={() => toggleMenu(false)}
          onClose={() => toggleMenu(false)}
          offsetX={245}
          offsetY={-50}
        >
          {['Ingredients', 'Meals', 'Plans'].map((s) => (
            <MenuItem key={s}>{s}</MenuItem>
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
                src='/images/person.jpeg'
                height={50}
                width={50}
                className='rounded-full'
              />
              Yegor Arndt
            </Button>
          }
          transition
          offsetY={10}
        >
          {['Log out', 'Save Session'].map((s) => (
            <MenuItem key={s}>{s}</MenuItem>
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
