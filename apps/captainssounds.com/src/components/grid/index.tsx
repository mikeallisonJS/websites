import type { ComponentProps } from 'react'

import { cn } from '@websites/shared/react/lib'

function Grid(props: ComponentProps<'ul'>) {
  return (
    <ul {...props} className={cn('grid grid-flow-row gap-4', props.className)}>
      {props.children}
    </ul>
  )
}

function GridItem(props: ComponentProps<'li'>) {
  return (
    <li
      {...props}
      className={cn('aspect-square transition-opacity', props.className)}
    >
      {props.children}
    </li>
  )
}

Grid.Item = GridItem

export default Grid
