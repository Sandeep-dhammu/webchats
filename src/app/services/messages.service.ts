import { Injectable } from '@angular/core';
import { GenericApi } from '../http-handler/generic-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages = new GenericApi('messages');
  constructor(private _http: HttpClient) {}

  async list(query:Object){
    try {
      return this.messages.search(query)
    } catch (err) {
      throw err
    }
  }
}
