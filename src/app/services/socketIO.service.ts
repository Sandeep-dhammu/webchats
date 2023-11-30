import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

constructor(private socketIO:Socket) { }

connect(){
  this.socketIO.connect()
}

}
