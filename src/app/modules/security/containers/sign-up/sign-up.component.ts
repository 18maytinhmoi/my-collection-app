import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PadButtonModule } from '@ui/button/button.module';
import { PadFormFieldModule } from '@ui/form-field/form-field.module';
import { PadIconModule } from '@ui/icon/icon.module';

@Component({
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    PadIconModule,
    PadButtonModule,
    PadFormFieldModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor() {}
}
