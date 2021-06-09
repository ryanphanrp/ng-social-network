import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeSiderComponent} from '@modules/home/home-sider/home-sider.component';
import {ViewPostComponent} from '@modules/home/view-post/view-post.component';
import {NewsfeedComponent} from '@modules/home/newsfeed/newsfeed.component';
import {HomeComponent} from '@modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: NewsfeedComponent
      },
      {
        path: 'posts/:ID',
        component: ViewPostComponent
      }
    ]
  },
  {
    path: '',
    component: HomeSiderComponent,
    outlet: 'sider'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
