import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PadButtonModule } from './../../@ui/button/button.module';
import { AppShellRoutingModule } from './app-shell-routing.module';
import { AppShellFacade } from './app-shell.facade';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { CollectionApi } from './services/collection.api';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent],
  providers: [AppShellFacade, CollectionApi],
  imports: [CommonModule, AppShellRoutingModule, PadButtonModule],
  exports: [AppShellRoutingModule],
})
export class AppShellModule {}
