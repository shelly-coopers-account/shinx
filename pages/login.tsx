import type { GetServerSideProps } from 'next'

import { Button } from 'components/ui'
import { useAuth } from 'lib/auth'
import type { Page } from 'next/app'

const Login: Page<{ prevUrl: string }> = ({
  prevUrl = '/',
}: {
  prevUrl: string
}) => {
  const { signinWithGoogle } = useAuth()

  return (
    <div className='bg-primary flex justify-center items-center w-full h-full min-h-[100vh] rounded-lg'>
      <div className='flex gap-5 p-5 bg-secondary'>
        {[
          {
            title: 'Welcome to Shinx',
            subtitle: 'A calorietracker you always wanted',
          },
          {
            title: 'Sign in to Shinx',
            subtitle: 'Get a free account, no credit card required',
          },
        ].map(({ title, subtitle }, i) => (
          <section
            key={title}
            className={`flex flex-col w-[28rem] ${
              i === 0 ? 'b-r pr-6 items-start' : 'items-center'
            }`}
            aria-label={title}
          >
            <h2
              className={`text-secondary ${
                i === 0 ? 'text-body-2' : 'text-title-3'
              }`}
            >
              {title}
            </h2>
            <p>{subtitle}</p>
            {i === 0 ? (
              <ul className='mt-5'>
                {[
                  {
                    name: 'Start Quickly',
                    desc: 'No setup, and all you need is sign in.',
                  },
                  {
                    name: 'Create Rapidly',
                    desc: 'Add ingredients, create meals, and nutrition plans, and share creations easily.',
                  },
                  {
                    name: 'Absolutely Free',
                    desc: 'Use simple tools to make your complex ideas come alive without having to pay a single penny.',
                  },
                ].map(({ name, desc }) => (
                  <li key={name} className='flex flex-col mb-5'>
                    <span className='before:content-["\2713"] before:text-gray-blue before:mr-1'>
                      {name}
                    </span>
                    <small>{desc}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <Button
                text='Sign in with Google'
                className='bg-primary mt-5'
                onClick={() => signinWithGoogle(prevUrl)}
              />
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const referer = ctx.req.headers.referer
  const prevUrl = referer?.includes('login') || !referer ? '/' : referer

  return {
    props: {
      prevUrl,
    },
  }
}
