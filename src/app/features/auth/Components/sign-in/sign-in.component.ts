import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthsService } from 'src/app/services/auths.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, ValidatorsService.usernameOrEmail]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    haveToRemember: new FormControl(false),
  });

  constructor(private _authsService: AuthsService, private router:Router, private toastr:ToastrService) {}

  ngOnInit() {}

  async signIn() {
    try {
      if (this.form.invalid) return this.form.markAllAsTouched();
      await this._authsService.signIn(this.form.value);
      this.router.navigateByUrl("/chat")
    }  catch (err:any) {
      console.error(err);
      this.toastr.error(err)
    }
  }
}
