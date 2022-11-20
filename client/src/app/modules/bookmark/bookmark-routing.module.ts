import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkManagementComponent } from './containers/bookmark-management/bookmark-management.component';

const routes: Routes = [
  {
    path: ':collectionId',
    component: BookmarkManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarkRoutingModule {}
