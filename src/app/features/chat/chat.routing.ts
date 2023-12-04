import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  { path:'', component:ChatComponent},
  // { path:'', component:ChatComponent, children:[
  //   { path:':id', component:InboxComponent },
  // ] },
];

export const ChatRoutes = RouterModule.forChild(routes);
