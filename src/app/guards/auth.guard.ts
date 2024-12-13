import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate  {
    

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(this.authService.verificarSesion() && this.authService.isAuthenticated()){   // cada vez que cambia pagina verifica la sesion y el usuario
          return true;
    }else {
          this.router.navigate(['/login']);
          return false;
      }
    }
   
  
}
