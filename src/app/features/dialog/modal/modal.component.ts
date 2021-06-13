import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '@core/_services/user.service';
import {IUser} from '@shared/models';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [UserService]
})
export class ModalComponent implements OnInit {

  curUser!: IUser;
  flag = false;

  constructor(
    private router: Router,
    private userSr: UserService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public value: { title: string, value: Observable<IUser[]> }) {
    userSr.getCurrentUser().subscribe(
      (res: IUser) => {
        this.curUser = res;
      }
    );
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(
      (_: MouseEvent) => {
        this.closeDialog();
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close(this.flag);
  }

  gotoProfile(username: string): void {
    this.closeDialog();
    this.router.navigate(['.']).then(_ => {
    });
    this.router.navigate(['./profile/', username]).then(_ => {
    });
  }

  existFl(ID: string): boolean {
    return this.curUser.following?.includes(ID) as boolean;
  }

  unFollow(ID: string): void {
    this.flag = true;
    this.userSr.unfollowUser(ID).subscribe(
      (_: any) => {
        this.curUser.following = this.curUser.following?.filter(el => el !== ID);
        this.cdRef.markForCheck();
      }
    );
  }

  follow(ID: string): void {
    this.flag = true;
    this.userSr.followUser(ID).subscribe(
      (_: any) => {
        this.curUser.following?.push(ID);
        this.cdRef.markForCheck();
      }
    );
  }

}
