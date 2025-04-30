'use client'

import { PageContainer } from '@mikeallisonjs/shared-react-components'
import { Table, TableCell, TableRow } from '@mikeallisonjs/ui/components/table'
import Link from 'next/link'

import { GlassContainer } from '@/components/glassContainer'

export default function Donate() {
  return (
    <PageContainer>
      <GlassContainer>
        <div className="text-2xl">
          Show some love and help me keep the lights on
        </div>
        <Table className="text-left">
          <TableRow>
            <TableCell>
              <Link href="http://paypal.me/captainofbass" target="_blank">
                Paypal
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="http://venmo.com/captainofbass" target="_blank">
                Venmo
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="http://cash.app/$captainofbass" target="_blank">
                CashApp
              </Link>
            </TableCell>
          </TableRow>
        </Table>
      </GlassContainer>
    </PageContainer>
  )
}
