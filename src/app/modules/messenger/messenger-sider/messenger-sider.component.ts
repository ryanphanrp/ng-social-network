import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IConversation, IUser} from '@shared/models';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MessengerService, UserService} from '@core/_services';

@Component({
  selector: 'app-messenger-sider',
  templateUrl: './messenger-sider.component.html',
  styleUrls: ['./messenger-sider.component.scss']
})
export class MessengerSiderComponent implements OnInit {

  curUser: IUser = this.userSr.getCurrentUser();
  searching = false;
  keyword = '';
  error = false;
  friends: IUser[] = [];
  conversations: Observable<IConversation[]> = this.messengerSr.getConversationOfUser();

  constructor(
    private userSr: UserService,
    private cdRef: ChangeDetectorRef,
    public messengerSr: MessengerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

// Back to list conversation
  switchMode(): void {
    this.searching = !this.searching;
    this.keyword = '';
    if (!this.searching) {
    }
  }

  // Show Result of Search input
  getFriends(event: { target: HTMLInputElement }): void {
    this.userSr.searchUser(event.target.value).subscribe(
      (next: IUser[]) => {
        this.error = false;
        this.friends = next;
        this.cdRef.markForCheck();
      },
      (err: any) => {
        console.log(err);
        this.error = true;
        this.friends = [];
        this.cdRef.markForCheck();
      }
    );
  }

  // Join conversation
  joinConversation(ID: string): void {
    this.router.navigate(['chat', ID]).then(_ => {
    });
  }
}
