import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '@features/dialog/dialog.service';
import {NewPostComponent} from '@features/post/new-post/new-post.component';
import {PostService} from '@core/_services/post.service';
import {Observable, of} from 'rxjs';
import {EditPostComponent} from '@features/post/edit-post/edit-post.component';
import {map} from 'rxjs/operators';
import {UserService} from '@core/_services';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  constructor(
    private dialog: MatDialog,
    private dialogSr: DialogService,
    private userSr: UserService,
    private postSr: PostService) {
  }

  /*
 *   Dialog create new post
 * */
  openNewPostDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '50vw',
      height: '70vh',
      disableClose: true,
      panelClass: 'new-post-dialog',
    });

    dialogRef.backdropClick().subscribe(next => {
      this.dialogSr.openConfirmDialog('Close', 'Do you want to close this dialog?').afterClosed().subscribe(
        (cfm: any) => {
          if (cfm) {
            dialogRef.close();
            return of(false);
          }
          return true;
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
    return dialogRef.afterClosed();
  }

  /*
 *   Dialog create new post
 * */
  openEditPostDialog(ID: string): Observable<boolean> {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '50vw',
      height: '70vh',
      disableClose: true,
      data: this.postSr.getSinglePost(ID),
      panelClass: 'edit-post-dialog',
    });

    dialogRef.backdropClick().subscribe((next: any) => {
      this.dialogSr.openConfirmDialog('Close', 'Do you want to close this dialog?').afterClosed().subscribe(
        (cfm: any) => {
          if (cfm) {
            dialogRef.close();
            return of(false);
          }
          return true;
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
    return dialogRef.afterClosed();
  }

  /*
    Dialog view users like post
  */
  viewUsersLikePost(ID: string): Observable<boolean> {
    return this.dialogSr.openInfoDialog('Likes', this.postSr.getUsersLikePost(ID)).pipe(
      map((el: any) => {
        if (el) {
          this.userSr.updateNewUser();
          return true;
        }
        return false;
      })
    );
  }
}
