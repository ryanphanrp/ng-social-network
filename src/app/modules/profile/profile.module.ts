import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ProfileSiderComponent} from './profile-sider/profile-sider.component';
import {SharedModule} from '@shared/shared.module';
import {UpdateProfileModule} from '@modules/profile/update-profile/update-profile.module';
import {PostModule} from '@features/post/post.module';


@NgModule({
  declarations: [ProfileComponent, ProfileSiderComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    UpdateProfileModule,
    PostModule
  ]
})
export class ProfileModule {
}
