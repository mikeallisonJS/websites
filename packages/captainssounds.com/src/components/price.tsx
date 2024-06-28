import type { ComponentProps } from 'react'

import { cn } from '@websites/shared/react/lib'

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName
}: {
  amount: string
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
} & ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(Number.parseFloat(amount))}`}
    <span
      className={cn('ml-1 inline', currencyCodeClassName)}
    >{`${currencyCode}`}</span>
  </p>
)

export default Price
