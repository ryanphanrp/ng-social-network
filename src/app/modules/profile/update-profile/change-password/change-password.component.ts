import {Component, OnInit} from '@angular/core';
import {IUser} from '@shared/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService, UserService} from '@core/_services';
import {DialogService} from '@features/dialog/dialog.service';
import {MustMatch} from '@core/_helpers/must-match.validator';

const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  curUser: IUser = this.userSr.getCurrentUser();
  pwForm!: FormGroup;
  isShow = false;
  show = {
    old: false,
    new: false
  };

  constructor(
    private userSr: UserService,
    private authSr: AuthService,
    private dialogSr: DialogService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.pwForm = this.fb.group({
      oldPW: ['', [Validators.required]],
      newPW: ['', [Validators.required, Validators.minLength(8), Validators.pattern(PASSWORD_PATTERN)]],
      confirmPW: ['', [Validators.required]]
    }, {
      validators: MustMatch('newPW', 'confirmPW')
    });
  }

  /* Switch - Hide or Show password */
  switchPassword(value: boolean): void {
    if (value) {
      this.show.new = !this.show.new;
      return;
    }
    this.show.old = !this.show.old;
  }

  /* Submit */
  onSubmit(): void {
    console.log(this.pwForm.value);
    this.userSr.changePassword(this.pwForm.value).subscribe(
      (_: any) => {
        this.dialogSr.success('Your password has been changed successfully!');
        this.dialogSr.loading('Waiting for logout in 3 seconds', 3000).subscribe(
          (_: any) => this.authSr.logOut()
        );
      }
    );
  }

}
