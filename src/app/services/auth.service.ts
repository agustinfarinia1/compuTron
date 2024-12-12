import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Persona } from '../models/persona.model';

interface Usuario {
  codigo: string;
  email: string;
  usuario: string;
  password: string; // Asegúrate de que este campo sea el correcto
  nombre: string;
  apellido: string;
  direccion: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL del jsonServer, seccion de usuarios

  constructor(private http: HttpClient, private router: Router) {}

  // Realiza el logueo de un usuario y lo carga en localStorage
  login(nombreUsuario: string, contrasena: string): Promise<boolean> {
    return this.http.get<Persona[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    ).toPromise().then(usuarios => {
      if (!usuarios) return false;

      const user = usuarios.find(u => u.nombreUsuario === nombreUsuario && u.contrasena === contrasena);
      if (user) {
        localStorage.setItem('usuario', JSON.stringify(user));
        localStorage.setItem('rol', user.role); // Guardar el rol en el localStorage
        return true;
      } else {
        return false;
      }
    });
  }

  // Desloguea redirige y elimina el usuario del localStorage.
  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('cantidadCarrito');
    this.router.navigate(['/login']);
  }

  // Consulta si el usuario esta autenticado.
  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario');
  }

  /* obtiene un usuario por su email, sirve para validar 
  si el usuario tiene un mail ya vinculado a otra cuenta*/
  consultarUsuario = async(email : string) => {
    const url = `http://localhost:3000/usuarios?email=${email}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
      }
    catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  // edita el usuario mediante su ID
  actualizarPerfil(usuario: Persona) {
    return this.http.put(`${this.apiUrl}/${usuario.id}`, usuario);
  }
  
  // Obtiene el usuario en localStorage
  obtenerUsuarioActual(): Persona {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}
