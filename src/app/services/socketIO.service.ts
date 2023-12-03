import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  // private myBehaviorSubject = new BehaviorSubject<string>('');

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

  sendMessage(message?:Object) {
    this.socketIO?.emit('sendMessage',message);
  }

  onMessage():Observable<any> | undefined{
   return this.socketIO?.fromEvent("onMessageSent")
  }

  newMessage(){
    return this.socketIO?.fromEvent("newMessage")
  }

  leftChat(chatId?:String){
    this.socketIO?.emit("left", {chatId ,userId:this.user?._id})
  }

  offline(){
    console.log("offline");
    
    this.socketIO?.emit("offline", this.user?._id)
  }
  disconnect(){
    console.log("disconnect");
    
    this.socketIO?.disconnect(this.socketIO)
  }
}
