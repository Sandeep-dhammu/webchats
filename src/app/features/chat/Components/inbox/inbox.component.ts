import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat.model';

@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
@Input('chatDetails') chatDetails:Chat | undefined = undefined
  constructor() { }

  ngOnInit() {
    console.log(this.chatDetails);
  }

}
