import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat.model';
import { User } from 'src/app/model/User.model';
import { ChatsService } from 'src/app/services/chats.service';
import { SocketIOService } from 'src/app/services/socketIO.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  search?: string = '';

  usersList?: User[];
  chatsList?: Chat[];

  chatDetails?: Chat 
  constructor(
    private _usersService: UsersService,
    private _chatsService: ChatsService,
    private _socketService: SocketIOService
  ) {}

  ngOnInit() {
    this.fetchChats();
    this._socketService.connect()
  }

  async fetchChats(target?: any) {
    let value;
    if (target) {
      value = target.value;
    }
    try {
      let res = await this._chatsService.listng({ search: value ?? ''});
      this.chatsList = res.docs;
    } catch (err) {
      console.error(err);
    }
  }
  async fetchUsers(target: any) {
    let { value } = target;
    if (!value) return;
    try {
      let res = await this._usersService.fetchList({ search: value });
      this.usersList = res.docs;
    } catch (err) {
      console.error(err);
    }
  }

  async createChat(userId?: String) {
    try {
      let res = await this._chatsService.create({ userId });
      this.chatDetails = res.body
    } catch (err) {
      console.error(err);
    }
  }

}
