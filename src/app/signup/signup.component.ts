import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string = '';
  password: string = '';

  fieldTextType!: boolean;
  
  constructor (  private auth: AuthService){}
  
  ngOnInit(): void {
   
  }
  
  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }

  signup() {
    if (this.email === '') {
      alert('Please enter email.');
      return;
    }
    if (this.password === '') {
      alert('Please enter password.');
    }

    this.auth.signup(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
