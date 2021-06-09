import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {AuthenticationComponent} from './authentication.component';
import {AuthSiderComponent} from '@modules/authentication/auth-sider/auth-sider.component';
import {NewPasswordComponent} from '@modules/authentication/password-recovery/new-password/new-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: 'signin'
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'new-password/:token',
        component: NewPasswordComponent
      }
    ]
  },
  {
    path: '',
    component: AuthSiderComponent,
    outlet: 'sider'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
