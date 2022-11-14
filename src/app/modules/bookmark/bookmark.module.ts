import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PadDialogModule } from '@ui/dialog/dialog.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import { BookmarkManagementComponent } from './containers/bookmark-management/bookmark-management.component';

@NgModule({
  declarations: [BookmarkManagementComponent],
  imports: [CommonModule, BookmarkRoutingModule, PadDialogModule],
})
export class BookmarkModule {}
