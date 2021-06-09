import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {enterAnimations, IMessage, IUser} from '@shared/models';
import {MessengerService, UserService} from '@core/_services';

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
  curUser: IUser = this.userSr.getCurrentUser();
  color = '#3498db';
  emoji = '👍';

  constructor(
    private activatedRoute: ActivatedRoute,
    private messengerSr: MessengerService,
    private userSr: UserService
  ) {
  }

  ngOnInit(): void {
    this.messages$ = this.activatedRoute.paramMap.pipe(
      map(pra => pra.get('ID') as string),
      switchMap(ID => this.messengerSr.getMessageAPI(ID))
    );
    this.activatedRoute.paramMap.pipe(
      map(pra => pra.get('ID') as string)).subscribe((res: string) => this.conversationID = res);
  }

  sendMessage(): void {
    if (!!this.content.trim()) {
      this.messengerSr.sendMessageAPI({ID: this.conversationID, content: this.content}).subscribe(
        res => console.log(res)
      );
      this.content = '';
    }
  }

  sendLike(): void {
    this.messengerSr.sendMessageAPI({ID: this.conversationID, content: this.emoji}).subscribe(
      res => console.log(res)
    );
  }
}
