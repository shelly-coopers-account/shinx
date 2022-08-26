import * as React from 'react'
import { SVGProps } from 'react'

const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <defs>
      <style>{'.logo_svg__cls-3{fill:#aecbfa}'}</style>
    </defs>
    <g data-name='Product Icons'>
      <path
        style={{
          fill: '#4285f4',
        }}
        d='m12.15 16.24 3.52-2.03v-4.06l-1.18-.69-3.52 6.1 1.18.68z'
      />
      <path
        style={{
          fill: '#669df6',
        }}
        d='M8.63 10.15v4.06l1.18.68 3.53-6.09-1.19-.69-3.52 2.04z'
      />
      <path
        className='logo_svg__cls-3'
        d='m11.46 17.45-4.22-2.44v-4.86L3.49 7.98v9.2l7.97 4.6v-4.33zM7.93 8.95l4.22-2.44 4.22 2.44 3.76-2.17-7.98-4.61-7.98 4.61 3.76 2.17zM17.06 15.01l-4.22 2.44v4.33l7.98-4.6v-9.2l-3.76 2.17v4.86z'
      />
    </g>
  </svg>
)

export default SvgLogo
