import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PadButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [PadButtonComponent],
  imports: [CommonModule],
  exports: [PadButtonComponent],
})
export class PadButtonModule {}
