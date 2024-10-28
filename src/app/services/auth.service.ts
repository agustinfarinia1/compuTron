import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Usuario {
  codigo: string;
  email: string;
  usuario: string;
  password: string; // Asegúrate de que este campo sea el correcto
  nombre: string;
  apellido: string;
  direccion: string;
  carrito: any[];
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, password: string): Promise<boolean> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    ).toPromise().then(usuarios => {
      if (!usuarios) {
        return false; // No hay usuarios
      }

      const user = usuarios.find(u => u.usuario === usuario && u.password === password);
      if (user) {
        localStorage.setItem('usuario', JSON.stringify(user));
        return true; // Inicio de sesión exitoso
      } else {
        return false; // Fallo en el inicio de sesión
      }
    });
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario'); // Cambia aquí de isAuth a isAuthenticated
  }
}
