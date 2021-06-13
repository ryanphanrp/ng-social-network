import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ResetPasswordComponent} from '@modules/authentication/password-recovery/reset-password/reset-password.component';
import {MailSentComponent} from '@modules/authentication/password-recovery/mail-sent/mail-sent.component';
import {DialogService} from '@features/dialog/dialog.service';
import {AuthService} from '@core/_services/auth.service';
import {TokenService} from '@core/_services/token.service';
import {UserService} from '@core/_services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  message = '';
  passwordShow = false;
  PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;

  constructor(private authService: AuthService,
              private userSr: UserService,
              private router: Router,
              private tokenService: TokenService,
              private fb: FormBuilder,
              private dialogSr: DialogService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // When logged access login page
    if (this.tokenService.getToken()) {
      console.log('Logged!');
      this.router.navigateByUrl('/').then(_ => {
      });
      console.log('Gone!');
    }

    // initial form
    this.signInForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(this.PASSWORD_PATTERN)],
      ],
    });
  }

  /* Switch - Hide or Show password */
  switchPassword(): void {
    this.passwordShow = !this.passwordShow;
  }

  /* Submit - login */
  login(): void {
    this.authService.signIn(this.signInForm.value).subscribe(
      (next: any) => {
        // Token Service
        this.tokenService.saveToken(next.token);
        this.tokenService.saveUser(next.user);

        // Auth Service
        this.authService.isAuth = true;
        this.router.navigate(['../']).then(_ => {
        });

        // Show notification
        this.dialogSr.success('Login successfully!');
      },
      (error: any) => {
        this.dialogSr.error(error.error.error);
      }
    );
  }

  /* Dialog - Reset password */
  openDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      height: 'auto',
      width: '25vw',
      panelClass: 'reset-password-dialog'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.openSuccessDialog();
      }
    });
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(MailSentComponent, {
      height: 'auto',
      width: '20vw',
      panelClass: 'mail-sent-dialog'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dialogSr.success('Waiting for recover new password');
      }
    });
  }
}
