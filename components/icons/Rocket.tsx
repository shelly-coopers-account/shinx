import * as React from 'react'
import { SVGProps } from 'react'

const SvgRocket = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 40 32'
    aria-hidden='true'
    {...props}
  >
    <g fill='currentColor'>
      <path
        fillRule='evenodd'
        d='m19.86 12.19 4.057-4.057c1.586-1.586 5.289-2.896 6.568-1.617s-.058 4.955-1.644 6.54l-4.056 4.057c-.34.34-.318.895-.152 1.347.997 2.718-3.89 7.541-3.89 7.541l-1.95-1.948 1.83-2.779-1.83.83-3.896-3.897.803-1.857-2.751 1.857L11 16.26s4.8-4.91 7.514-3.917c.451.165 1.007.187 1.347-.153z'
        clipRule='evenodd'
      />
      <path d='M13.608 25.29a2.178 2.178 0 1 0-2.643-2.635L10 26.259z' />
    </g>
  </svg>
)

export default SvgRocket
