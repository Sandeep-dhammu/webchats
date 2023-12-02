import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  socketIO?:Socket
  user:User = JSON.parse(localStorage.getItem('user-data') as string);
  constructor(private socketService: Socket) {
    this.socketIO = socketService
  }

  markOnline() {
    this.socketIO?.emit('online', this.user._id);
  }

  join(chatId?:String) {
    this.socketIO?.emit('join',{
      chatId,
      userId:this.user?._id
    });
  }

  sendMessage(chatId?:String) {
    this.socketIO?.emit('sendMessage',{
      chatId,
      userId:this.user?._id,
      message:{
        text:"Hello",
      }
    });
  }

  onMessage(){
    this.socketIO?.fromEvent("onMessage").subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    })
  }
  newMessage(){
    this.socketIO?.fromEvent("newMessage").subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    })
  }
}
