import { Component, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, skip } from 'rxjs';

@Component({
  selector: 'pad-form-wrapper',
  template: `
    <form (submit)="onSubmit()" [formGroup]="formGroup">
      <ng-content></ng-content>
    </form>
  `,

  styleUrls: ['./form-wrapper.component.scss'],
})
export class PadFormWrapperComponent {
  @Input() public formGroup!: FormGroup;
  public readonly submitted$ = new BehaviorSubject(false);

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public readonly submit = this.submitted$.pipe(skip(1));
  constructor() {}

  public onSubmit(): void {
    this.submitted$.next(true);
  }
}
