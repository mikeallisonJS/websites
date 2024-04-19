import clsx from 'clsx'
import { ComponentProps } from 'react'

function Grid(props: ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={clsx('grid grid-flow-row gap-4', props.className)}
    >
      {props.children}
    </ul>
  )
}

function GridItem(props: ComponentProps<'li'>) {
  return (
    <li
      {...props}
      className={clsx('aspect-square transition-opacity', props.className)}
    >
      {props.children}
    </li>
  )
}

Grid.Item = GridItem

export default Grid
