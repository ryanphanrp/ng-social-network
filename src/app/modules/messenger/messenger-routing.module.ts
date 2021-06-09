import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessengerComponent} from '@modules/messenger/messenger.component';
import {MessengerSiderComponent} from '@modules/messenger/messenger-sider/messenger-sider.component';
import {MessageListComponent} from '@modules/messenger/message-list/message-list.component';
import {InboxComponent} from '@modules/messenger/inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    component: MessengerComponent,
    children: [
      {
        path: '',
        component: InboxComponent
      },
      {
        path: ':ID',
        component: MessageListComponent
      }
    ]
  },
  {
    path: '',
    component: MessengerSiderComponent,
    outlet: 'sider'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessengerRoutingModule {
}
