import {Component, OnInit} from '@angular/core';
import {IUser} from '@shared/models';
import {Observable} from 'rxjs';
import {MessengerService, UserService} from '@core/_services';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  providers: [UserService]
})
export class MessengerComponent implements OnInit {

  curUser: IUser =  this.userSr.currentUser;
  friends$: Observable<IUser[]> = this.userSr.getFriendList(this.curUser?._id);

  constructor(
    private userSr: UserService,
    public messengerSr: MessengerService
  ) {
  }

  ngOnInit(): void {
  }

}
