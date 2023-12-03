import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { UserComponent } from './Components/users-list/user/user.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { ChatRoutes } from './chat.routing';
import { FormFieldsModule } from 'src/app/shared/form-fields/form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutes,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    AngularEditorModule,
    CKEditorModule
  ],
  declarations: [
    ChatComponent,
    UsersListComponent,
    InboxComponent,
    UserComponent,
    UserProfileComponent
   ]
})
export class ChatModule { }
