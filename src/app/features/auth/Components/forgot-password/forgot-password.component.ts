import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthsService } from 'src/app/services/auths.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form:FormGroup = new FormGroup({
    email:new FormControl("", [Validators.required, ValidatorsService.email])
  })

  constructor(private _authsService:AuthsService, private router:Router, private toastr:ToastrService
    ) { }

  ngOnInit() {
  }

  async forgotPassword() {
    try {
      if (this.form.invalid) return this.form.markAllAsTouched();
      await this._authsService.forgotPassword(this.form.value);
      this.router.navigateByUrl("/auth/email-sent"); 
    }  catch (err:any) {
      console.error(err);
      this.toastr.error(err)
    }
  }

}
