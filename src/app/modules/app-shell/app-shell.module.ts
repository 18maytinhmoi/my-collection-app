import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PadButtonModule } from './../../@ui/button/button.module';
import { PadIconModule } from './../../@ui/icon/icon.module';
import { AppShellRoutingModule } from './app-shell-routing.module';
import { AppShellFacade } from './app-shell.facade';
import { NavCollectionItemComponent } from './components/nav-collection-item/nav-collection-item.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { CollectionApi } from './services/collection.api';
import { CollectionState } from './services/collection.state';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavCollectionItemComponent,
    NavItemComponent,
  ],
  providers: [AppShellFacade, CollectionApi, CollectionState],
  imports: [
    CommonModule,
    AppShellRoutingModule,
    PadIconModule.forRoot(),
    PadButtonModule,
  ],
  exports: [AppShellRoutingModule],
})
export class AppShellModule {}
