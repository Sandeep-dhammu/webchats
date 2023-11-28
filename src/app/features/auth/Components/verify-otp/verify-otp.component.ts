import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthsService } from 'src/app/services/auths.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  userId?:string;
  form:FormGroup = new FormGroup({
    userId:new FormControl(""),
    first:new FormControl(""),
    second:new FormControl(""),
    third:new FormControl(""),
    fourth:new FormControl("")
  })
  constructor(private _authsService:AuthsService, private _router:Router) { }

  ngOnInit() {
    this.userId = history.state.userId
  }

  async verifyOTP(){
    try {
      // this._authsService.verify()
    } catch (err) {
      
    }
  }

}
