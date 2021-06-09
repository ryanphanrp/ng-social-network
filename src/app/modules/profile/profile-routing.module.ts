import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileSiderComponent} from '@modules/profile/profile-sider/profile-sider.component';
import {UpdateProfileComponent} from '@modules/profile/update-profile/update-profile.component';
import {VerifyAccountComponent} from '@modules/profile/update-profile/verify-account/verify-account.component';
import {ProfileComponent} from '@modules/profile/profile.component';
import {OwnerGuard} from '@core/_guard/owner.guard';

const routes: Routes = [
  {
    path: ':username',
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'update',
        component: UpdateProfileComponent,
        canActivate: [OwnerGuard]
      },
      {
        path: '',
        component: ProfileSiderComponent,
        outlet: 'sider'
      }
    ]
  },
  {
    path: 'verify/:token',
    component: VerifyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
