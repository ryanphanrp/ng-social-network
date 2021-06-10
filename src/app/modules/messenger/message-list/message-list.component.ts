import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {enterAnimations, IMessage, IUser, toPartner} from '@shared/models';
import {MessengerService, UserService} from '@core/_services';
import {DialogService} from '@features/dialog/dialog.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  animations: enterAnimations
})
export class MessageListComponent implements OnInit {

  messages$!: Observable<IMessage[]>;
  content = '';
  conversationID = '';
  partner!: IUser;
  curUser: IUser = this.userSr.currentUser;
  color = '#3498db';
  emoji = '👍';
  messagesList: IMessage[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private messengerSr: MessengerService,
    private userSr: UserService,
    private dialogSr: DialogService,
    private router: Router
  ) {
    this.getMessage();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(pra => pra.get('ID') as string),
      switchMap(ID => this.messengerSr.getMessageAPI(ID))
    ).subscribe(
      (res: any) => {
        this.messages$ = of(res.messages);
        this.messagesList = res.messages;
        this.partner = toPartner(res.conversation, this.curUser._id);
      },
      (error: any) => {
        console.log(error);
      }
    );

    // Get Conversation ID
    this.activatedRoute.paramMap.pipe(
      map(pra => pra.get('ID') as string)).subscribe((res: string) => this.conversationID = res);
  }


  /*
    Send Messages
  */
  sendMessage(): void {
    if (!!this.content.trim()) {
      // this.messengerSr.sendMessageAPI({ID: this.conversationID, content: this.content}).subscribe(
      //   res => console.log(res)
      // );
      // this.content = '';
      const payload = {
        senderId: this.curUser._id,
        receiverId: this.partner._id,
        msg: this.content
      };
      this.messengerSr.sendMessage(payload);
    }
  }

  getMessage(): void {
    this.messengerSr.getMessage().subscribe(res => console.log(res));
  }

  /*
    When click Like Button
  */
  sendLike(): void {
    this.messengerSr.sendMessageAPI({ID: this.conversationID, content: this.emoji}).subscribe(
      res => console.log(res)
    );
  }

  /*
    Confirm & delete conversation then navigation
  */
  deleteConversation(): void {
    this.dialogSr.openConfirmDialog(
      'Confirm',
      'Are you sure that delete this conversation?'
    ).afterClosed().subscribe(
      (res: any) => {
        if (res) {
          this.messengerSr.deleteConversation(this.conversationID).subscribe(
            (_: any) => {
              this.messengerSr.updateConversations();
              this.router.navigate(['chat']).then((__: any) => {
              });
            }
          );
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onClick(): void {
    this.messengerSr.getConversations().subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
