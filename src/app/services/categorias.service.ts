import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  // Crea una nueva categoria de productos en el JsonServer
  setNewCategoria = async(newCategoria : Categoria) => {
    try{
      const url = `http://localhost:3000/categorias`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategoria)
      })
      return this.getCantidadCategorias();
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  // edita una categoria productos existente, ligada a su ID
  editarCategoria = async(categoria : Categoria) => {
    try{
      const url = `http://localhost:3000/categorias/${categoria.getId()}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  // Obtiene categorias producto
  getCategorias = async() => {
    const url = `http://localhost:3000/categorias`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((estadoPedido : any) => new Categoria(estadoPedido.id,estadoPedido.valor));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  // Obtiene cantidad total de categorias.
  getCantidadCategorias = async() => {
    const url = `http://localhost:3000/categorias`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.length + 1;
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
    return 0;
  }
}
