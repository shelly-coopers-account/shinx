import * as React from 'react'
import { SVGProps } from 'react'

const SvgGear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 40 32'
    aria-hidden='true'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M21.253 6h-3.076l-.463 1.85a8.413 8.413 0 0 0-2.13.931l-1.567-.94-2.176 2.176.94 1.567a8.414 8.414 0 0 0-1.01 2.435L10 14.462v3.077l1.772.442a8.37 8.37 0 0 0 1.01 2.435l-.94 1.567 2.175 2.176 1.566-.94c.744.456 1.564.8 2.436 1.01L18.46 26h3.077l.443-1.772a8.411 8.411 0 0 0 2.435-1.01l1.567.94 2.176-2.175-.94-1.567c.456-.743.8-1.563 1.01-2.435L30 17.538v-3.077l-1.772-.442a8.411 8.411 0 0 0-1.01-2.436l.94-1.566-2.175-2.176-1.567.94a8.408 8.408 0 0 0-2.736-1.076zM20 20.286a4.286 4.286 0 1 0 0-8.572 4.286 4.286 0 0 0 0 8.572z'
      clipRule='evenodd'
    />
  </svg>
)

export default SvgGear
