import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat.model';
import { User } from 'src/app/model/User.model';
import { AuthsService } from 'src/app/services/auths.service';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  search?: string = '';

  usersList?: User[];
  chatsList?: Chat[];
  constructor(
    private _usersService: UsersService,
    private _chatsService: ChatsService
  ) {}

  ngOnInit() {
    this.fetchChats();
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
      let chat = await this._chatsService.create({ userId });
      console.log(chat);
    } catch (err) {
      console.error(err);
    }
  }
}
