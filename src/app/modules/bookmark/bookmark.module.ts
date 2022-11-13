import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import { BookmarkManagementComponent } from './containers/bookmark-management/bookmark-management.component';

@NgModule({
  declarations: [BookmarkManagementComponent],
  imports: [CommonModule, BookmarkRoutingModule],
})
export class BookmarkModule {}
