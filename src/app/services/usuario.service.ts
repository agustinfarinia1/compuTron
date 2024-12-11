import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios'; 

  constructor(private http: HttpClient) {}

  // Método para obtener el usuario por ID (si lo tienes en una API)
  obtenerUsuarioPorId(id: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener el usuario desde el localStorage (si no usas API)
  // obtenerUsuarioPorIdLocal(id: string): Persona | null {
  //   const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  //   return usuarios.find((usuario: Persona) => usuario.id === id) || null;
  // }
}
