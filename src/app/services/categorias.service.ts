import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  getCategorias = async() => {
    const url = `http://localhost:3000/categorias`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos;
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }
}
