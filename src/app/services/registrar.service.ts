import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private mockUsers: Persona[] = []; // Almacenamiento temporal

  constructor(private http: HttpClient) {}

  verificarDatos(nombreUsuario: string, email: string): Observable<{ emailDisponible: boolean; usuarioDisponible: boolean }> {
    return this.http.get<Persona[]>(this.apiUrl).pipe(
      map(personas => this.checkAvailability(personas, nombreUsuario, email)), // Mapea para revisar que no se repitan el usuario ni el mail
      catchError((error) => {
        console.error('Error al obtener los usuarios de la API:', error);
        return of({ emailDisponible: false, usuarioDisponible: false }); // Para manejar el error y no fallar
      })
    );
  }
  
  // revisa uno a uno 
  private checkAvailability(personas: Persona[], nombreUsuario: string, email: string) {
    const emailDisponible = !personas.some(persona => persona.email && persona.email.toLowerCase() === email.toLowerCase());
    const usuarioDisponible = !personas.some(persona => persona.nombreUsuario && persona.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase());
    return { emailDisponible, usuarioDisponible };
}


  async registrarUsuario(usuario: Persona): Promise<Observable<Persona>> {
    const id =  await this.getCantidadUsuarios();  // Crea el id basado en la cantidad de usuarios

    // Asignar el id al usuario
    const usuarioConId = { ...usuario, id: id.toString() };
    return this.verificarDatos(usuario.nombreUsuario, usuario.email).pipe(
      switchMap(({ emailDisponible, usuarioDisponible }) => {  // Cambio de observable 
        if (!emailDisponible || !usuarioDisponible) {
          const error = !emailDisponible ? 'El email ya está registrado' : 'El nombre de usuario ya está en uso';
          return throwError(() => new Error(error));
        }

        return this.http.post<Persona>(this.apiUrl, usuarioConId).pipe(
          catchError(() => {
            console.warn('Guardando en datos simulados');
            const newUser = { ...usuario  }; 
            this.mockUsers.push(newUser);
            return of(newUser);
          })
        );
      })
    );
  }
  
  getCantidadUsuarios = async (): Promise<number> => {
    try {
      const respuesta = await fetch(this.apiUrl);  // Obtener los usuarios
      const datos = await respuesta.json();        // Convertir la respuesta en JSON
      return datos.length + 1;                     // Devolver la cantidad de usuarios + 1 (para el nuevo id)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return 1;  // Si hay un error, asignar id 1 como fallback
    }
  }
}
