import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthsService } from 'src/app/services/auths.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        ValidatorsService.username,
      ]),
      email: new FormControl('', [
        Validators.required,
        ValidatorsService.email,
      ]),
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
  constructor(private _authService: AuthsService, private router: Router, private toastr:ToastrService) {}

  ngOnInit() {}

  async userSignUp() {
    try {
      if (this.form.invalid) {
        return this.form.markAllAsTouched();
      }
      let user = (await this._authService.signUp(this.form.value)) as any;
      this.router.navigateByUrl('/auth/email-sent');
    } catch (err:any) {
      console.error(err);
      this.toastr.error(err)
    }
  }
}
