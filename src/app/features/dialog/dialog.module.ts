import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {ModalComponent} from './modal/modal.component';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {SharedModule} from '@shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogService} from '@features/dialog/dialog.service';

@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [SnackBarComponent]
})
export class DialogModule {
  static forRoot(): any {
    return {
      ngModule: DialogModule,
      providers: [DialogService]
    };
  }
}
