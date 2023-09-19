import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInGuard: boolean = false;
 
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) { }

  //login method

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Logged In Succesfully!');
        localStorage.getItem('email');
        this.router.navigate(['/properties']);
        this.isLoggedInGuard = true;
        
      }, err => {
        this.toastr.warning('Something went wrong.');
        this.router.navigate(['/login']);
      })
  }

  //register method

  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Registration succesfully.');
        localStorage.setItem('email', 'true');
        console.log(email, password);
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
        this.router.navigate(['/signup']);

      })
  }

  //logout method 
  
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('email');
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
      console.log('Logged out');
      this.toastr.success('User Logged Out Successfully!');
    }, err =>{
      alert(err.message)
    }
    )
  }

}
