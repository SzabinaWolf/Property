import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';


export const authGuard : CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);


  if (authService.isLoggedInGuard) {
    console.log('Access Granted');
    
    return true;
  } else {
    console.log('Access Denied');
    toastr.warning('You don\'t have Permission to enter this Page!')
    router.navigate(['/login']);
    return false;
  }

};
