import * as React from 'react'
import { SVGProps } from 'react'

const SvgSheet = (props: SVGProps<SVGSVGElement>) => (
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
      d='M13 7a1 1 0 0 1 1-1h7v6h6v13a1 1 0 0 1-1 1H14a1 1 0 0 1-1-1zm9-1 5 5h-5z'
      clipRule='evenodd'
    />
  </svg>
)

export default SvgSheet
