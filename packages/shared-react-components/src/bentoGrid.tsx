import { cn } from './utils/cn'

export const BentoGrid = ({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  colSpan = 1,
  rowSpan = 1
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}) => {
  return (
    <div
      className={cn(
        'group row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950',
        className,
        colSpan === 2 && 'sm:col-span-2',
        colSpan === 3 && 'sm:col-span-2 lg:col-span-3',
        rowSpan === 2 && 'sm:row-span-2'
      )}
    >
      {header && (
        <div className="overflow-hidden">
          {header}
        </div>
      )}
      <div>
        {icon && (
          <div className="mb-2">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="mb-2 font-sans text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </h3>
        )}
        {description && (
          <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
