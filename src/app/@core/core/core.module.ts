import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() core: CoreModule
    // private readonly authService: AuthService
  ) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    } else {
      this.initialize();
    }
  }

  private initialize(): void {}
}
