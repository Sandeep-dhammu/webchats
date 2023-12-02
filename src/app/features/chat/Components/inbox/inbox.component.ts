import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chat } from 'src/app/model/Chat.model';
import { SocketIOService } from 'src/app/services/socketIO.service';

@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, OnChanges{
@Input('chatDetails') chatDetails:Chat | undefined = undefined
  constructor(private _socketService:SocketIOService) { }

  ngOnInit() {
    console.log(this.chatDetails);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._socketService.onMessage()
    this._socketService.newMessage()
  }

  sendMessage(){
    this._socketService.sendMessage()
  }

}
