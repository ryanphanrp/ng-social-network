import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HomeSiderComponent} from './home-sider/home-sider.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '@shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { ViewPostComponent } from './view-post/view-post.component';
import {PostModule} from '@features/post/post.module';


// Material Modules
const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatInputModule
];

@NgModule({
  declarations: [HomeComponent, SearchBarComponent, HomeSiderComponent, NewsfeedComponent, ViewPostComponent],
  imports: [
    CommonModule,
    materialModules,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    PostModule
  ]
})
export class HomeModule {
}
