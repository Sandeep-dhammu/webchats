import { Injectable } from '@angular/core';
import { GenericApi } from '../http-handler/generic-api';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../model/Chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private chats = new GenericApi<any>('chats', this._http);

  constructor(private _http:HttpClient) {}

  create(body:any){
    try {
      return this.chats.create("", body)
    } catch (err) {
      throw err
    }
  }

  listng(query:Object) {
    try {
        return this.chats.search(query)
    } catch (err) {
      throw err
    }
  }
}
