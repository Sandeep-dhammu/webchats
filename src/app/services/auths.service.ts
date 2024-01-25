import { Injectable } from '@angular/core';
import { GenericApi } from '../http-handler/generic-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class AuthsService {
  private auths = new GenericApi('auths');
  constructor(private _http:HttpClient, private socketIO:Socket) {}
  
  async signUp(body:Object){
    try {
      let response = await this.auths.create("sign-up", body);
      return response.body
    } catch (err) {
      throw err
    }
  }
  async signIn(body:any){
    try {
      let response = await this.auths.create("sign-in", body);
      if(body.haveToRemember){
        localStorage.setItem("x-access-token", response.body["x-access-token"]);
      }else{
        sessionStorage.setItem("x-access-token", response.body["x-access-token"])
      }
      delete response.body["x-access-token"];
      localStorage.setItem("user-data", JSON.stringify(response.body));
      return response.body;
    } catch (err) {
      throw err
    }
  }
  async verify(body:Object){
    try {
      let response = await this.auths.create("verify", body);
      return response.body
    } catch (err) {
      throw err
    }
  }
  async forgotPassword(body:Object){
    try {
      let response = await this.auths.create("forgot-password", body);
      return response.body
    } catch (err) {
      throw err
    }
  }
  async resetPassword(body:Object){
    try {
      let response = await this.auths.create("reset-password", body);
      return response.body
    } catch (err) {
      throw err
    }
  }
}
