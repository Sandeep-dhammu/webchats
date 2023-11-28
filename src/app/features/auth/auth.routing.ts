import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { VerifyOtpComponent } from './Components/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { EmailSentComponent } from './Components/email-sent/email-sent.component';
import { EmailConfirmationComponent } from './Components/email-confirmation/email-confirmation.component';

const routes: Routes = [
  {  path:'', component:AuthComponent, children:[
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'email-sent', component: EmailSentComponent },
    { path: 'email-confirmation', component: EmailConfirmationComponent },
    { path: 'verify', component: VerifyOtpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
  ]},
];

export const AuthRoutes = RouterModule.forChild(routes);
