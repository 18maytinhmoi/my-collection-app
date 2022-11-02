import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./containers/sign-in/sign-in.component').then(
        m => m.SignInComponent
      ),
  },

  {
    path: 'sign-up',
    loadComponent: () =>
      import('./containers/sign-up/sign-up.component').then(
        m => m.SignUpComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
