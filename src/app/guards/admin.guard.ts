import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 




@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
  
      // Verificar si el usuario es administrador
      const rol = localStorage.getItem('rol');
      if (rol === 'admin') {
        return true;
      } else {
        this.router.navigate(['/no-autorizado']); // te envia a la página de acceso no autorizado
        return false;
      }
    }
  }
  