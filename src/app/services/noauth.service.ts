// no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Asegúrate de tener este servicio para la autenticación

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Controla el acceso del usuario no autenticado.
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;  // Permitir acceso si no está autenticado
    } else {
      this.router.navigate(['/inicio']);  // Redirigir si ya está autenticado
      return false;
    }
  }
}
