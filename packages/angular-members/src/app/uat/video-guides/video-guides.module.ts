import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VideoGuidesComponent } from './video-guides.component'
import { AppThemeModule } from '../../app-theme.module'

@NgModule({
  declarations: [VideoGuidesComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [VideoGuidesComponent]
})
export class VideoGuidesModule {}
