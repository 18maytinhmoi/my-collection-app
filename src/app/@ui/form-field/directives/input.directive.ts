import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[padInput]',
})
export class PadInputDirective {
  @Input() public formControl!: FormControl;
  constructor() {}
}
