import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BioComponent } from './bio.component';

@NgModule({
  declarations: [BioComponent],
  imports: [CommonModule, RouterModule],
  exports: [BioComponent],
})
export class BioModule {}
