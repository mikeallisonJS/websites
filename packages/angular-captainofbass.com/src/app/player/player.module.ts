import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSliderModule } from '@angular/material/slider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { PlayerComponent } from './player.component'

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule {}
