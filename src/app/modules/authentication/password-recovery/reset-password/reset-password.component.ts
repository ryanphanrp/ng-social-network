import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogService} from '@features/dialog/dialog.service';
import {AuthService} from '@core/_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email = '';

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private authSr: AuthService,
    private dialogSr: DialogService) {
  }

  ngOnInit(): void {
  }

  /* Send Request Reset password to Server */
  onSubmit(): void {
    this.authSr.resetPassword(this.email).subscribe(
      (_: any) => {
        this.dialogSr.success('Successful!. Please check your email.');
        this.dialogRef.close(true);
      }, (err: any) => {
        this.dialogSr.error('Something went wrong with your email.');
      }
    );
  }

}
