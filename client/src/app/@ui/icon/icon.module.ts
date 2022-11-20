import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PadIconComponent } from './components/icon/icon.component';
import { PadIconRegistry } from './registry';
import { PadIconConfig, PAD_ICON_CONFIG } from './type';

@NgModule({
  declarations: [PadIconComponent],
  providers: [PadIconRegistry],
  exports: [PadIconComponent],
  imports: [CommonModule, HttpClientModule],
})
export class PadIconModule {
  static forRoot(
    config: Partial<PadIconConfig> = {}
  ): ModuleWithProviders<PadIconModule> {
    return {
      ngModule: PadIconModule,
      providers: [
        {
          provide: PAD_ICON_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
