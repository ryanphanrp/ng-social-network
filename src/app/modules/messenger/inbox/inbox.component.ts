import {Component, OnInit} from '@angular/core';
import {IConversation, IUser} from '@shared/models';
import {MessengerService, UserService} from '@core/_services';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  curUser: IUser = this.userSr.getCurrentUser();
  conversations: IConversation[] = [];

  constructor(private userSr: UserService,
              private messengerSr: MessengerService) {
  }

  ngOnInit(): void {
    this.messengerSr.getConversationOfUser().pipe(
    ).subscribe((res: IConversation[]) => this.conversations = res);
  }

  deleteAllConversation(): void {
    this.conversations.forEach((ele: IConversation) => {
      this.messengerSr.deleteConversation(ele._id as string).subscribe(
        (res: any) => console.log(res)
      );
    });
  }

}
