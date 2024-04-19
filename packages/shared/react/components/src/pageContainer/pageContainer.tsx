import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Box width="90vw" mt="80px" textAlign="center" mx="5vw" mb={10}>
      {children}
    </Box>
  )
}
