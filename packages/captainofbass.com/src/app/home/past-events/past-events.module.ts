import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { PastEventsComponent } from './past-events.component';

@NgModule({
  declarations: [PastEventsComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule],
  exports: [PastEventsComponent],
})
export class PastEventsModule {}
