import type { ComponentProps } from 'react'

import { cn } from '@mikeallisonjs/shared-react-lib'

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName,
  donation
}: {
  amount: string
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
  donation?: boolean
} & ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {donation
      ? 'Donation'
      : `${new Intl.NumberFormat(undefined, {
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
