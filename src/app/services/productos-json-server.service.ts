import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosJsonServerService {

  setNewProducto = async(producto : Producto) => {
    try{
      const url = `http://localhost:3000/stock`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      })
      return this.getCantidadProductos();
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  editarProducto = async(producto : Producto) => {
    try{
      const url = `http://localhost:3000/stock/${producto.getId()}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  getProductos = async() => {
    const url = `http://localhost:3000/stock?eliminado=false`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((item: any) => new Producto(item.codigo,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen,item.id));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  getCantidadProductos = async() => {
    const url = `http://localhost:3000/stock`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.length + 1;
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
    return 0;
  }

  consultarCodigo = async(codigo : string) => {
    const url = `http://localhost:3000/stock?id=${codigo}&eliminado=false`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
      }
    catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }
}
