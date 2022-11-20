import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'pad-form-wrapper:not([ngNoFocus])',
})
export class PadFormFocusDirective implements AfterViewInit {
  focusable = ['input', 'textarea'];

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    const nativeElement = this.element.nativeElement as HTMLElement;
    const input: null | HTMLInputElement | HTMLTextAreaElement =
      nativeElement.querySelector(this.focusable.join(','));
    if (input) {
      input.focus();
    }
  }
}
