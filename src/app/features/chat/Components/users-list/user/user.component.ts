import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input("user") user?:User
  constructor() { }

  ngOnInit() {
  }

}
