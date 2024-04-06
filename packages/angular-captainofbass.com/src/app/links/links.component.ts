import { Component } from '@angular/core'
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faMixcloud,
  faSoundcloud,
  faSpotify,
  faNapster,
  faTwitterSquare,
  faYoutubeSquare
} from '@fortawesome/free-brands-svg-icons'

import {
  faDonate,
  faEnvelope,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  animations: []
})
export class LinksComponent {
  donate = faDonate
  email = faEnvelope
  facebook = faFacebookSquare
  instagram = faInstagramSquare
  linkedin = faLinkedin
  mixcloud = faMixcloud
  napster = faNapster
  newspaper = faNewspaper
  soundcloud = faSoundcloud
  spotify = faSpotify
  twitter = faTwitterSquare
  youtube = faYoutubeSquare
}
