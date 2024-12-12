import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Si usas una API REST
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios'; // URL del JsonServer, para los usuarios

  constructor(private http: HttpClient) {}

  // Obtiene usuario desde jsonServer, mediante ID
  obtenerUsuarioPorId(id: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  // Obtiene usuario desde localStorage, mediante ID
  obtenerUsuarioPorIdLocal(id: string): Persona | null {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.find((usuario: Persona) => usuario.id === id) || null;
  }
}
