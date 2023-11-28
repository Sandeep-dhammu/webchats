import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';
import { AuthsService } from 'src/app/services/auths.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  search?:string =  ''

  usersList?:User[];
  constructor(private _usersService:UsersService) { }

  ngOnInit() {
  }


  async fetch(target:any){
    let {value}= target
    try {
      let res = await this._usersService.fetchList({search:value});
      this.usersList = res.docs
    } catch (err) {
      console.error(err);
    } 
  }

}
