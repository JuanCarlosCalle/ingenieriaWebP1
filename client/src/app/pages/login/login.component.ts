import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel} from './userModel';
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loginData: UserModel;
  errmess: string;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm() {
    this.formLogin = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  public onSubmit() {
    this.loginData = this.formLogin.value;

    this.loginService.authenticate(this.loginData).subscribe(
      (role) => {

        if(role === 'client') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/dashboard'])
        }

      },
      () => {
        this.errmess = 'Incorrect Username or Password';
      }
    );
  }
}
