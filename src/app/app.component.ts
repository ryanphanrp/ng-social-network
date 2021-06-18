import { Component } from '@angular/core';
import {AuthService, UserService} from '@core/_services';
import {enterAnimations, IUser} from '@shared/models';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: enterAnimations
})
export class AppComponent {
  title = environment.brand;
  curUser!: IUser;

  constructor(
    private authSr: AuthService,
    private router: Router,
    public userSr: UserService) {
    userSr.getCurrentUser().subscribe(
      (res: IUser) => {
        this.curUser = res;
      }
    );
  }

  logOut(): void {
    this.authSr.logOut();
  }

  updateProfile(): void {
    const username = this.userSr.currentUser.username;
    this.router.navigate(['profile', username, 'update']).then(_ => {});
  }
}
