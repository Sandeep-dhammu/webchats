import { Component, OnDestroy } from '@angular/core';
import { SocketIOService } from './services/socketIO.service';
// import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'web chat';
  constructor(private _socketService:SocketIOService){
    
  }
  ngOnDestroy(): void {
    console.log("disconnect");
    
    this._socketService.disconnect()
  }
}
