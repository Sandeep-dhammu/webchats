import { Injectable } from '@angular/core';
import { GenericApi } from '../http-handler/generic-api';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = new GenericApi<User>('users', this._http);
  constructor(private _http: HttpClient) {}

  fetchList(query:any){
    try {
      return this.users.search(query)
    } catch (err) {
      throw err
    }
  }
}
