import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';
import {authInterceptorProviders} from '@core/_helpers/auth.interceptor';
import {SharedModule} from '@shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from '@features/dialog/dialog.module';

/*
Material Modules
*/
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MessengerService, UserService} from '@core/_services';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatSidenavModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatChipsModule,
  MatSnackBarModule,
  MatTooltipModule
];

const configSocket: SocketIoConfig = {url: environment.API_URL, options: {}};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule.forRoot(),
    SocketIoModule.forRoot(configSocket),
    BrowserAnimationsModule,
    materialModules,
    SharedModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [authInterceptorProviders, MessengerService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
