import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppThemeModule } from '../../app-theme.module'

import { VideoGuidesComponent } from './video-guides.component'

@NgModule({
  declarations: [VideoGuidesComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [VideoGuidesComponent]
})
export class VideoGuidesModule {}
