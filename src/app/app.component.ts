import { Component } from '@angular/core';
import {UserService} from '@core/_services';
import {enterAnimations, IUser} from '@shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: enterAnimations
})
export class AppComponent {
  title = 'Social Network';
  curUser: IUser = this.userSr.currentUser;

  constructor(
    public userSr: UserService) {
  }
}
