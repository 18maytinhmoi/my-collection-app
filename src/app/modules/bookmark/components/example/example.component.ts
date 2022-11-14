import { Component } from '@angular/core';
import { DialogInjector } from '@ui/dialog/dialog-injector';
import { DialogRef } from '@ui/dialog/dialog-ref';
import { DialogConfig } from '@ui/dialog/models/dialog-config';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  public config: DialogConfig;
  public ref: DialogRef;

  constructor(public injector: DialogInjector) {
    this.config = injector.get(DialogConfig);
    this.ref = injector.get(DialogRef);

    console.log(injector);
  }

  onClose() {
    this.ref.close('some value');
  }
}
