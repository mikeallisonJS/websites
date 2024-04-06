import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const DynamicMusicClient = dynamic(() => import('./pageClient'), { ssr: false })
export default function Music(): ReactElement {
  return (
    <Box width="90vw" mt="80px" textAlign="center" mx="5vw" mb={10}>
      <DynamicMusicClient />
    </Box>
  )
}
