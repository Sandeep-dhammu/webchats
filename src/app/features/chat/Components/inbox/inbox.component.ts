import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Chat } from 'src/app/models/Chat.model';
import { Message } from 'src/app/models/Message.modal';
import { User } from 'src/app/models/User.model';
import { MessagesService } from 'src/app/services/messages.service';
import { SocketIOService } from 'src/app/services/socketIO.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { timeout } from 'rxjs';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit, OnChanges {
  @Input('chatDetails') chatDetails: Chat | undefined = undefined;
  @ViewChild('scrollDiv') private chatScroll?:ElementRef
  localUser: User = JSON.parse(localStorage.getItem('user-data') as string);
  messagesList?: Message[] = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    defaultParagraphSeparator: 'div',
    sanitize: false,
    placeholder: 'Enter text here...',
    showToolbar: false,
    outline: false,
    defaultFontSize: '2.5',
    defaultFontName: 'Archivo',
    minHeight: '25px',
    maxHeight: '50px',
    // customClasses: [
    //   {
    //     name: 'font-14',
    //     class: 'font-14',
    //     tag: 'div',
    //   },
    // ],
  };



  form: FormGroup = new FormGroup({
    text: new FormControl(''),
  });
  
  
  constructor(
    private _socketService: SocketIOService,
    private _messagesService: MessagesService
  ) {
  }
  
  ngOnInit() {
    this._socketService.onMessage()?.subscribe((newMsg: Message) => {
      console.log("newMsg");
      this.messagesList?.push(newMsg);
      this.scrollToBottom()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chatDetails) {
      this.form.get('chatId')?.setValue(this.chatDetails._id);
      this.fetch();
    }
  }

  sendMessage(e:any) {
    const payload = {
      chatId: this.chatDetails?._id,
      userId: this.localUser._id,
      message: this.form.value,
    };
    if (!payload.chatId || !payload.userId || !payload.message) return;
    this._socketService.sendMessage(payload);
    this.form.reset();
  }

  async fetch() {
    try {
      let res = await this._messagesService.list({
        chatId: this.chatDetails?._id,
      });
      this.messagesList = res?.body;
      console.log(this.chatScroll);
      
      // this.scrollToBottom()
      this.scrollBottom()
    } catch (err) {
      console.error(err);
    }
  }

  scrollToBottom(elm?:any){
    console.log(this.chatScroll?.nativeElement.scrollHeight);
    setTimeout(() => {
      this.chatScroll?.nativeElement.scroll({
        top:this.chatScroll.nativeElement.scrollHeight,
        left:0,
        behavior:"smooth"
      })
    }, 100);
  }
  
  scrollBottom() {
    let el: any = document.getElementById('inbox');
  
    setTimeout(() => {
      el.scroll({ top: el.scrollHeight });
    }, 10);
  }

}
