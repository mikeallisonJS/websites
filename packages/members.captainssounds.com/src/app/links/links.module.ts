import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NgPipesModule } from 'ngx-pipes'

import { AppThemeModule } from '../app-theme.module'
import { NavigationContainerModule } from '../navigation-container/navigation-container.module'
import { ProductModule } from '../product/product.module'

import { LinksComponent } from './links.component'

@NgModule({
  declarations: [LinksComponent],
  imports: [
    CommonModule,
    AppThemeModule,
    NavigationContainerModule,
    NgPipesModule,
    ProductModule
  ],
  exports: [LinksComponent]
})
export class LinksModule {}
