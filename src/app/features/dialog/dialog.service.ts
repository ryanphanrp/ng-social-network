import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {AlertComponent} from '@features/dialog/alert/alert.component';
import {Observable} from 'rxjs';
import {ModalComponent} from '@features/dialog/modal/modal.component';
import {SnackBarComponent} from '@features/dialog/snack-bar/snack-bar.component';
import {IUser} from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  type: 'success' | 'error' | 'info' = 'success';

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  /*
  *   Show content dialog
  * */
  openInfoDialog(title: string, value: Observable<IUser[]>): Observable<any> {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '25vw',
      height: '60vh',
      disableClose: true,
      panelClass: 'modal-dialog',
      data: {title, value}
    });

    dialogRef.backdropClick().subscribe(
      (_: any) => {
        return dialogRef.close();
      }
    );

    return dialogRef.afterClosed();
  }

  /*
  *  Confirm Dialog
  * */
  openConfirmDialog(title: string, message: string): any {
    return this.dialog.open(AlertComponent, {
      width: '20vw',
      data: {title, message},
      panelClass: 'confirm-dialog'
    });
  }

  /*
  *   Snack Bar
  * */
  openSnackBar(type: string, message: string, duration = 2000): Observable<any> {
    const data = {type, message};
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.data = data;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    const snackbar = this.snackBar.openFromComponent(SnackBarComponent, config);
    return snackbar.afterDismissed();
  }

  success(message: string, duration = 2000): void {
    this.openSnackBar('success', message, duration);
  }

  error(message: string, duration = 2000): void {
    this.openSnackBar('error', message, duration);
  }

  loading(message: string, duration = 2000): Observable<any> {
    return this.openSnackBar('loading', message, duration);
  }
}
