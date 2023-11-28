import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthsService } from 'src/app/services/auths.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      cPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    },
    {
      validators: [ValidatorsService.compare('password', 'cPassword')],
    }
  );

  isEmailVerified:boolean = false
  userToken?:string

 

  constructor(private _activatedRoute:ActivatedRoute, private _authsService: AuthsService, private _router: Router) {
    this.userToken = _activatedRoute.snapshot.queryParams["token"];
  }

  ngOnInit() {
    if(!this.userToken) {
      this._router.navigateByUrl("/auth/sign-in")
    } 
  }

  async resetPassword() {
    try {
      if (this.form.invalid) return this.form.markAllAsTouched();
      await this._authsService.resetPassword({
        token:this.userToken,
        password:this.form.get('password')?.value
      });
      this._router.navigateByUrl('/auth/sign-in');
    } catch (err) {
      console.error(err);
    }
  }
}
