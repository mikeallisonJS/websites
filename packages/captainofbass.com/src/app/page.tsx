import { Box, Divider } from '@mui/material'
import { ReactElement } from 'react'
import PastEvents from '../components/pastEvents/pastEvents'
import Bio from '../components/bio/bio'
import HomeLogo from '../components/homeLogo/homeLogo'

export default function Index(): ReactElement {
  return (
    <Box width="90vw" mt="70px" textAlign="center" mx="5vw" mb={10}>
      <HomeLogo />
      <Divider />
      <Bio />
      <Divider />
      <PastEvents />
    </Box>
  )
}
