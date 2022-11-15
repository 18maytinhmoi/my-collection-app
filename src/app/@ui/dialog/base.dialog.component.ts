import { inject } from '@angular/core';
import { DialogRef } from './dialog-ref';
import { DialogConfig } from './models/dialog-config';

export abstract class BaseDialogComponent {
  public config = inject(DialogConfig);
  public ref = inject(DialogRef);
}
