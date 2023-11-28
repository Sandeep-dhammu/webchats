import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { UserComponent } from './Components/users-list/user/user.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { ChatRoutes } from './chat.routing';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutes
  ],
  declarations: [
    ChatComponent,
    UsersListComponent,
    InboxComponent,
    UserComponent,
    UserProfileComponent
   ]
})
export class ChatModule { }
