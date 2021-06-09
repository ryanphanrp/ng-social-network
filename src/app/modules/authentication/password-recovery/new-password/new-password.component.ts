import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {DialogService} from '@features/dialog/dialog.service';
import {MustMatch} from '@core/_helpers/must-match.validator';
import {AuthService} from '@core/_services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPWForm: FormGroup;
  showPassword = false;
  token = '';
  PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSr: AuthService,
    private activatedRoute: ActivatedRoute,
    private dialogSr: DialogService) {
    this.newPWForm = this.fb.group({
        password: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN), Validators.minLength(8)]],
        confirm: ['', [Validators.required]]
      },
      {
        validators: MustMatch('password', 'confirm')
      });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(ele => ele.get('token'))
    ).subscribe(
      (res: any) => {
        this.token = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    const payload = {
      token: this.token,
      password: this.newPWForm.get('password')?.value
    };
    this.authSr.newPassword(payload).subscribe(
      (res: any) => {
        this.dialogSr.success('New Password has been created successfully');
        this.router.navigate(['auth/signin']).then(r => {
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
