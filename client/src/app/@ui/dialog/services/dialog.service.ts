import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogInjector } from '../dialog-injector';
import { DialogRef } from '../dialog-ref';
import { DialogConfig } from '../models/dialog-config';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogComponentRef!: ComponentRef<DialogComponent>;
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public open(componentType: Type<any>, config: DialogConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: new DialogInjector(this.injector, map),
    });

    this.appRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.document.body.appendChild(domElement);

    const sub = dialogRef.afterClosed$.subscribe(() => {
      // close dialog
      this.removeDialogComponentFromBody(componentRef);
      sub.unsubscribe();
    });

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(
    dialogComponentRef: ComponentRef<DialogComponent>
  ) {
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
  }
}
