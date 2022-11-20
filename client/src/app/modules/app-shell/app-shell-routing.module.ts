import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LayoutComponent } from './containers/layout/layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'loading',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bookmark',
        loadChildren: () =>
          import('../bookmark/bookmark.module').then(m => m.BookmarkModule),
      },
    ],
  },
  {
    path: '',
    loadChildren: () => import('../security/security.module').then(m => m.SecurityModule),
  },
];

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'loading',
//     pathMatch: 'full',
//   },
//   {
//     path: 'loading',
//     component: LoadingComponent,
//   },
//   {
//     path: '',
//     component: LayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'overview',
//         loadChildren: () =>
//           import('../overview/overview.module').then(m => m.OverviewModule),
//       },
//     ],
//   },
//   {
//     path: '',
//     loadChildren: () =>
//       import('../security/security.module').then(m => m.SecurityModule),
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppShellRoutingModule {}
