import React from 'react'

export type DefaultProps = {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string | false
  as?: keyof React.ReactHTML
}
