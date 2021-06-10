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
import {MessengerService} from '@core/_services';

const materialModules = [
  MatSidenavModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatChipsModule,
  MatSnackBarModule
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
    SharedModule
  ],
  providers: [authInterceptorProviders, MessengerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
