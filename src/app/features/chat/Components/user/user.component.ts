import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/Chat.model';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input("chat") chat?:Chat;
  @Input("user") user?:User;
  constructor() { }

  ngOnInit() {
  }

  

}