import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[padInsertion]',
})
export class InsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
