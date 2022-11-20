import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'button[pad-button]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PadButtonComponent {
  @HostBinding('class') get buttonClass(): string {
    const classes = ['bg-[#7700FF]', 'h-12', 'w-96'];
    return classes.filter(Boolean).join(' ');
  }
  constructor() {}
}
