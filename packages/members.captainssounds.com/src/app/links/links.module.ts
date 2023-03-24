import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LinksComponent } from './links.component'
import { NavigationContainerModule } from '../navigation-container/navigation-container.module'
import { ProductModule } from '../product/product.module'
import { NgPipesModule } from 'ngx-pipes'
import { AppThemeModule } from '../app-theme.module'

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
