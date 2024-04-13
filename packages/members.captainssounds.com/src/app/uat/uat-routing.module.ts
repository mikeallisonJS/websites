import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GetStartedComponent } from './get-started/get-started.component'
import { UatComponent } from './uat.component'
import { VideoGuidesComponent } from './video-guides/video-guides.component'

const routes: Routes = [
  {
    path: 'uat',
    component: UatComponent,
    children: [
      { path: '', component: GetStartedComponent },
      {
        path: 'video-guides',
        component: VideoGuidesComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UatRoutingModule {}
