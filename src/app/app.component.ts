import { Component, OnDestroy } from '@angular/core';
import { SocketIOService } from './services/socketIO.service';
// import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web chat';
  constructor(){}
}
