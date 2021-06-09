import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {AuthenticationComponent} from './authentication.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthSiderComponent} from './auth-sider/auth-sider.component';
import {ResetPasswordComponent} from './password-recovery/reset-password/reset-password.component';
import {NewPasswordComponent} from './password-recovery/new-password/new-password.component';
import {MailSentComponent} from './password-recovery/mail-sent/mail-sent.component';

@NgModule({
  declarations: [SigninComponent, SignupComponent, AuthenticationComponent,
    AuthSiderComponent, ResetPasswordComponent, NewPasswordComponent, MailSentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule {
}
