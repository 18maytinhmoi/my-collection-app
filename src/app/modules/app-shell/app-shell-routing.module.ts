import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './containers/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [],
  },
  {
    path: '',
    loadChildren: () =>
      import('../security/security.module').then(m => m.SecurityModule),
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
