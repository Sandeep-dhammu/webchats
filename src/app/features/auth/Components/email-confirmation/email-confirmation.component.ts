import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthsService } from 'src/app/services/auths.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  isEmailVerified:boolean = false
  userToken?:string

  constructor(private _activatedRoute:ActivatedRoute, private _authsService:AuthsService,private router:Router) {
    this.userToken = _activatedRoute.snapshot.queryParams["token"];
   }

  ngOnInit() {
    if(!this.userToken) {
      this.router.navigateByUrl("/auth/sign-in")
    }else{
      this.verifyEmail()
    }
  }

  async verifyEmail(){
    try {
      let res = await this._authsService.verify({token:this.userToken});
      this.isEmailVerified = true;

      setTimeout(() => {
        this.router.navigateByUrl("/auth/sign-in")
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

}
