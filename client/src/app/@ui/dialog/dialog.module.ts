import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { InsertionDirective } from './directives/insertion.directive';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [DialogComponent, InsertionDirective],
  providers: [DialogService],
  imports: [CommonModule],
})
export class PadDialogModule {}
