import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(() => {

      this.router.navigateByUrl("/auth/sign-in")
    }, 5000);
  }

}
