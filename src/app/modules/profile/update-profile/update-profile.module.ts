import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdateProfileComponent} from './update-profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateInformationComponent } from './update-information/update-information.component';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

// Material Modules
const materialModules = [
  MatTabsModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatDialogModule
];

@NgModule({
  declarations: [UpdateProfileComponent, ChangePasswordComponent, UpdateInformationComponent, UpdateAvatarComponent, VerifyAccountComponent],
  imports: [
    CommonModule,
    materialModules,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateProfileModule {
}
