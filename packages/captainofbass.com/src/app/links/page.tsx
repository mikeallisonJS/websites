'use client'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons/faBitcoin'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faMixcloud } from '@fortawesome/free-brands-svg-icons/faMixcloud'
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons/faSoundcloud'
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons/faMoneyBill1'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons/faNewspaper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import {
  PageContainer,
  Table,
  TableCell,
  TableRow
} from '@websites/shared/react/components'

import { GlassContainer } from '../../components/glassContainer'

export default function Music() {
  return (
    <PageContainer>
      <GlassContainer>
        <div className="text-2xl">Where to find Captain</div>
        <Table className="text-left">
          <TableRow>
            <TableCell>
              <Link href="/epk">
                <FontAwesomeIcon icon={faNewspaper} /> Electronic Press Kit
                (EPK)
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="/donate">
                <FontAwesomeIcon icon={faMoneyBill1} /> Donate (EPK)
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link
                href="https://open.spotify.com/artist/4XHSbdpOsFpEWPOdj9nxfH"
                target="_blank"
              >
                <FontAwesomeIcon icon={faSpotify} /> Spotify
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://soundcloud.com/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faSoundcloud} /> SoundCloud
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://mixcloud.com/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faMixcloud} /> MixCloud
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://mixcloud.com/mikeallison" target="_blank">
                <FontAwesomeIcon icon={faMixcloud} /> MixCloud (pre Captain)
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://audius.co/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faBitcoin} /> Audius
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://instagram.com/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://youtube.com/c/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faYoutube} /> Youtube
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://facebook.com/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="https://x.com/captainofbass" target="_blank">
                <FontAwesomeIcon icon={faXTwitter} /> X
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link
                href="https://www.linkedin.com/in/captainofbass"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="mailto:mike@captainofbass.com" target="_blank">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </Link>
            </TableCell>
          </TableRow>
        </Table>
      </GlassContainer>
    </PageContainer>
  )
}
