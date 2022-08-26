import cn from 'classnames'
import type { ChangeEvent, KeyboardEventHandler } from 'react'

import { Search } from '@components/icons'
import type { DefaultProps } from '@components/ui/types'

type SearchBarProps = {
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  placeholder?: string
} & DefaultProps

const SearchBar = ({ className, ...props }: SearchBarProps) => {
  return (
    <form
      className={cn(
        'relative size-s bg-secondary rounded-lg max-w-[18.5rem]',
        className
      )}
    >
      <Search className='absolute left-1 top-0 h-full w-11' />
      <input
        type='text'
        className='ml-8 h-full w-[90%] bg-transparent'
        placeholder='Search'
        autoComplete='off'
        {...props}
      />
    </form>
  )
}

export default SearchBar
