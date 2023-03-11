import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DonateComponent } from './donate.component';

@NgModule({
  declarations: [DonateComponent],
  imports: [MatListModule],
  exports: [DonateComponent],
})
export class DonateModule {}
