import { Component } from '@angular/core';
import { DialogService } from '@ui/dialog/services/dialog.service';

@Component({
  selector: 'app-bookmark-management',
  templateUrl: './bookmark-management.component.html',
  styleUrls: ['./bookmark-management.component.scss'],
})
export class BookmarkManagementComponent {
  constructor(public dialog: DialogService) {
    // const ref = this.dialog.open(ExampleComponent, {
    //   data: { message: 'I am a dynamic component inside of a dialog!' },
    // });
    // ref.afterClosed$.subscribe(result => {
    //   console.log('Dialog closed', result);
    // });
  }
}
