import {
  Component,
  ContentChild,
  ContentChildren,
  inject,
  QueryList
} from '@angular/core';
import { PadInputDirective } from '@ui/form-field/directives/input.directive';
import { PadLabelDirective } from '@ui/form-field/directives/label.directive';
import { PadFormWrapperComponent } from '../form-wrapper/form-wrapper.component';

@Component({
  selector: 'pad-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class PadFormFieldComponent {
  @ContentChild(PadLabelDirective) label?: PadLabelDirective;
  @ContentChildren(PadInputDirective, { descendants: true })
  public readonly inputs!: QueryList<PadInputDirective>;
  public readonly submitted$ = inject(PadFormWrapperComponent).submitted$;
  public readonly tracker = (i: any) => i;

  constructor() {}
}
