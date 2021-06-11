import {Component, OnInit} from '@angular/core';
import {IUser} from '@shared/models';
import {MatDialog} from '@angular/material/dialog';
import {UpdateAvatarComponent} from '@modules/profile/update-profile/update-avatar/update-avatar.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService, UserService} from '@core/_services';
import {DialogService} from '@features/dialog/dialog.service';

const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,20}$/;

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss']
})
export class UpdateInformationComponent implements OnInit {
  curUser!: IUser;
  infoForm!: FormGroup;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authSr: AuthService,
    private dialogSr: DialogService) {
    userService.getCurrentUser().subscribe(
      (res: IUser) => {
        this.curUser = res;
      }
    );
  }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      name: ['', [Validators.maxLength(30), Validators.required]],
      username: ['', [Validators.maxLength(20), Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      email: ['', [Validators.email, Validators.required]],
      bio: ['', [Validators.maxLength(200)]]
    });

    this.infoForm.patchValue({
      name: this.curUser?.name,
      username: this.curUser?.username,
      email: this.curUser?.email,
      bio: this.curUser?.bio
    });
  }

  // Open Update Avatar Dialog
  openUpdateAvatarDialog(event: any): void {
    this.dialog.open(UpdateAvatarComponent, {
      height: '33vw',
      width: '30vw',
      data: event
    });
  }

  /* Submit form to update information */
  submit(): void {
    const payload = {
      name: this.infoForm.value?.name,
      username: this.infoForm.value?.username,
      email: this.infoForm.value?.email,
      bio: this.infoForm.value?.bio,
      avatarUrl: this.curUser?.avatarUrl
    };

    // Update information
    this.userService.updateInfoUser(payload).subscribe(
      (_: any) => {
        this.dialogSr.success('Your Information has been updated successfully!');
        this.userService.updateCurrentUser();
        this.curUser = this.userService.currentUser;
      },
      (error: any) => {
        console.log(error);
        this.dialogSr.error('Something went wrong!');
      }
    );
  }

  /* Verify */
  verifyAccount(): void {
    this.authSr.requestVerify(this.curUser.email).subscribe(
      (_: any) => {
        this.dialogSr.success('Please check your mail to verify account');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
