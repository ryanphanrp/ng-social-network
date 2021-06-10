import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';
import { MessengerSiderComponent } from './messenger-sider/messenger-sider.component';
import {SharedModule} from '@shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import { MessageListComponent } from './message-list/message-list.component';
import { ActiveFriendsComponent } from './active-friends/active-friends.component';
import { InboxComponent } from './inbox/inbox.component';
import {MessengerService} from '@core/_services';


@NgModule({
  declarations: [MessengerComponent, MessengerSiderComponent, MessageListComponent, ActiveFriendsComponent, InboxComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    SharedModule,
    MatDividerModule,
    FormsModule
  ],
  providers: [MessengerService]
})
export class MessengerModule { }
