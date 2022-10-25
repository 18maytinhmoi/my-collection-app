import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PadFormFieldComponent } from './components/form-field/form-field.component';
import { PadFormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { PadFormFocusDirective } from './directives/form-focus.directive';
import { PadInputDirective } from './directives/input.directive';
import { PadLabelDirective } from './directives/label.directive';
import { FormInputErrorsPipe } from './pipes/form-input-errors.pipe';

@NgModule({
  declarations: [
    PadFormFocusDirective,
    PadLabelDirective,
    PadFormFieldComponent,
    PadFormWrapperComponent,
    PadInputDirective,
    FormInputErrorsPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    PadLabelDirective,
    PadFormFieldComponent,
    PadFormWrapperComponent,
    PadInputDirective,
    PadFormFocusDirective,
  ],
})
export class PadFormFieldModule {}
