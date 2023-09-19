import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fieldTextType!: boolean;

  email: string = '';
  password: string = '';


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {
    if (this.email === '') {
      alert('Please enter email.');
      return;
    }
    if (this.password === '') {
      alert('Please enter password.');
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}


