import clsx from 'clsx'
import { ComponentProps } from 'react'

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
    }).format(parseFloat(amount))}`}
    <span
      className={clsx('ml-1 inline', currencyCodeClassName)}
    >{`${currencyCode}`}</span>
  </p>
)

export default Price
