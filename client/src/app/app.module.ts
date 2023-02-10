import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppShellModule } from './modules/app-shell/app-shell.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, AppShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
