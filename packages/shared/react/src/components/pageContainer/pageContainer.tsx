import { ReactElement, ReactNode } from 'react'
import Box from '@mui/material/Box'

export default function PageContainer({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <Box width="90vw" mt="80px" textAlign="center" mx="5vw" mb={10}>
      {children}
    </Box>
  )
}
