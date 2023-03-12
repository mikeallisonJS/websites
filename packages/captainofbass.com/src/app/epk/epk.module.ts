import { NgModule } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { BioModule } from '../home/bio/bio.module'
import { EpkComponent } from './epk.component'

@NgModule({
  declarations: [EpkComponent],
  imports: [MatListModule, BioModule],
  exports: [EpkComponent]
})
export class EpkModule {}
