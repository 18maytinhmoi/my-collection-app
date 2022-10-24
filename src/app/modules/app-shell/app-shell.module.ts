import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PadButtonModule } from './../../@ui/button/button.module';
import { AppShellRoutingModule } from './app-shell-routing.module';
import { LayoutComponent } from './containers/layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, AppShellRoutingModule, PadButtonModule],
  exports: [AppShellRoutingModule],
})
export class AppShellModule {}
