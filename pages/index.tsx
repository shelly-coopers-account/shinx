import { useState, useEffect } from 'react'
import format from 'date-fns/format'
import cn from 'classnames'

import DashboardLayout from 'components/layouts'
import { SearchBar } from 'components'
import { Button, Link } from 'components/ui'
import { Present } from 'components/icons'
import { showEditIngredientModal } from 'components/modals'
import { useAuth } from 'lib/auth'
import type { Page } from 'next/app'
import type { ButtonProps, LinkProps } from 'components/ui'

type Greeting = 'Hello' | 'Good morning' | 'Good afternoon' | 'Good evening'

const Home: Page = () => {
  const [greeting, setGreeting] = useState<Greeting>('Hello')
  const { user } = useAuth()

  useEffect(() => {
    const hour = new Date().getHours()

    if (hour < 12) return setGreeting('Good morning')
    if (hour < 18) return setGreeting('Good afternoon')
    setGreeting('Good evening')
  }, [])

  return (
    <>
      <header className='flex justify-between p-8'>
        <section aria-label={greeting + user?.name}>
          <h1 className='flex gap-4 mb-3 text-secondary'>
            {greeting}, {user?.name}
            <Link
              to='/'
              before={<Present />}
              isize={20}
              text='Go Premium'
              className='bg-secondary text-yellow text-caption rounded-lg font-thin h-8 px-2'
            />
          </h1>
          <time>» {format(new Date(), 'MMMM dd')}</time>
        </section>
        <SearchBar />
      </header>
      <main className='flex flex-col p-8'>
        {[
          {
            title: 'Jump back in',
            items: ['1', '2', '3', '4'],
            component: (s: string) => (
              <div key={s} className='animate-pulse bg-secondary h-64 w-64' />
            ),
          },
          {
            title: 'What are you up to?',
            items: [
              {
                text: '+ New ingredient',
                onClick: showEditIngredientModal,
              },
              {
                text: '+ New meal',
                onClick: showEditIngredientModal,
              },
              {
                text: '+ New plan',
                onClick: showEditIngredientModal,
              },
              {
                text: 'Look up a food',
                to: '/database',
              },
            ],
            component: (props: ButtonProps | LinkProps) => {
              const p = { ...props, key: props.text, className: 'px-0' }

              return props.to ? <Link {...p} /> : <Button {...p} />
            },
          },
        ].map(({ title, items, component }, i) => (
          <section key={title} className='last-of-type:mt-8' aria-label={title}>
            <h2
              className={cn('text-secondary', { 'text-title-3 mb-5': i === 0 })}
            >
              {title}
            </h2>
            <div className='flex gap-4'>
              {items.map((i) => component(i as any))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
