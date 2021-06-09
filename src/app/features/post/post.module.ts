import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPostComponent } from './card-post/card-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { HashtagChipComponent } from './hashtag-chip/hashtag-chip.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const materialModules = [
  MatChipsModule,
  MatFormFieldModule,
  MatDividerModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
];

@NgModule({
    declarations: [
        CardPostComponent,
        ListPostComponent,
        DetailPostComponent,
        NewPostComponent,
        EditPostComponent,
        UploadImageComponent,
        HashtagChipComponent
    ],
  exports: [
    CardPostComponent,
    ListPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ImageCropperModule,
    FormsModule,
    materialModules
  ]
})
export class PostModule { }
