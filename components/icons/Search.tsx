import * as React from 'react'
import { SVGProps } from 'react'

const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 26c5.523 0 10-4.477 10-10S25.523 6 20 6s-10 4.477-10 10 4.477 10 10 10zm-.46-15a4.54 4.54 0 1 0 2.404 8.393L24.8 22.45 26.25 21l-2.857-3.056A4.54 4.54 0 0 0 19.54 11zm-2.49 4.54a2.49 2.49 0 1 1 4.98 0 2.49 2.49 0 0 1-4.98 0z'
      clipRule='evenodd'
    />
  </svg>
)

export default SvgSearch
