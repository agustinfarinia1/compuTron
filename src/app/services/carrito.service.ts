import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Carrito } from '../models/carrito.model';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  constructor() {}

  getCarritoServer = async(idUsuario:string) => {
    let carrito = new Carrito("","");
    const url = `http://localhost:3000/carrito?idUsuario=${idUsuario}`;
    //const url = `http://localhost:3000/carrito`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          carrito.setId(datos[0].id);
          carrito.setIdUsuario(datos[0].idUsuario);
          carrito.setCarrito(datos[0].carrito);
          // datos.map((item: any) => new Producto(item.codigo,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen,item.id));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      return carrito;
  }

  setCarritoServer = async(idUsuario:string, carrito:Carrito) => {
    try{
      const url = `http://localhost:3000/carrito?idUsuario=${idUsuario}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrito)
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }
}
