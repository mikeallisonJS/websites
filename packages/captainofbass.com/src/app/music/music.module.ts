import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { ByTitlePipe } from './by-title.pipe';
import { OriginalPipe } from './original.pipe';
import { RemixPipe } from './remix.pipe';
import { MusicComponent } from './music.component';

@NgModule({
  declarations: [MusicComponent, RemixPipe, OriginalPipe, ByTitlePipe],
  imports: [CommonModule, MatListModule, FlexLayoutModule],
  exports: [MusicComponent],
})
export class MusicModule {}
