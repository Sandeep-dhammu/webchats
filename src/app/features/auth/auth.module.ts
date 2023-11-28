import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyOtpComponent } from './Components/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { EmailSentComponent } from './Components/email-sent/email-sent.component';
import { EmailConfirmationComponent } from './Components/email-confirmation/email-confirmation.component';
import { FormFieldsModule } from 'src/app/shared/form-fields/form-fields.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule
  ],
  declarations: [AuthComponent, SignUpComponent, SignInComponent, VerifyOtpComponent, ForgotPasswordComponent, ResetPasswordComponent, EmailSentComponent, EmailConfirmationComponent  ]
})
export class AuthModule { }
