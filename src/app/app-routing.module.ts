import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {path:'', pathMatch:"full", redirectTo:"auth"},
  {path:'auth', loadChildren:() => import('./features/auth/auth.module').then(m => m.AuthModule),canActivate:[LoginGuard]},
  {path:'chat', loadChildren:() => import('./features/chat/chat.module').then(m => m.ChatModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
