import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/Chat.model';
import { User } from 'src/app/models/User.model';
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
    private _socketService: SocketIOService,
    private _router:Router
  ) {}

  ngOnInit() {
    this.fetchChats();
    this._socketService.markOnline()
    this._socketService.newMessage()?.subscribe(d => {
      console.log("new Message");
      this.fetchChats()
    })
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
      if(this.chatDetails && res.body){
        this._socketService.leftChat(this.chatDetails?._id)
      }
      if(res.body){
        this.chatDetails = res.body;
        this._socketService.join(this.chatDetails?._id)
        // this._router.navigateByUrl("/chat/" +this.chatDetails?._id)
      }
    } catch (err) {
      console.error(err);
    }
  }

}
