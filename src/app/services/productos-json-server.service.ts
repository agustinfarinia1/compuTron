import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosJsonServerService {

  getStock = async() => {
    const url = `http://localhost:3000/stock`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((item: any) => new Producto(item.codigo,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }
  setNewProductoStock = async(producto : Producto) => {
    try{
      const url = `http://localhost:3000/stock`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      })
      const datos = await respuesta.json();
      return datos;
    }
    catch(error) {
      console.error('Error:', error);
    }
  }
}
