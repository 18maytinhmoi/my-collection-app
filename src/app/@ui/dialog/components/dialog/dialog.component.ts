import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { InsertionDirective } from '@ui/dialog/directives/insertion.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly _onClose = new Subject<any>();

  public componentRef!: ComponentRef<any>;
  public childComponentType!: Type<any>;
  public onClose = this._onClose.asObservable();

  @ViewChild(InsertionDirective) insertionPoint!: InsertionDirective;
  constructor(private _cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this._loadChildComponent(this.childComponentType);
    this._cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(evt: MouseEvent) {
    // close the dialog
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  private _loadChildComponent(componentType: Type<any>) {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentType);
  }
}
