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

  setCarritoServer = async (idUsuario: string, carrito: Carrito) => {
    try {
      // Primero intenta hacer un GET para ver si el carrito ya existe
      const urlGet = `http://localhost:3000/carrito?idUsuario=${idUsuario}`;
      const respuestaGet = await fetch(urlGet);
      const datos = await respuestaGet.json();
  
      if (datos.length > 0) {
        // Si existe, actualiza con PUT usando el ID del carrito encontrado
        const carritoId = datos[0].id; // Asumiendo que solo hay un carrito por usuario
        const urlPut = `http://localhost:3000/carrito/${carritoId}`; // Cambia a PUT por ID
        await fetch(urlPut, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(carrito)
        });
      } else {
        // Si no existe, crea uno nuevo con POST
        const urlPost = `http://localhost:3000/carrito`;
        await fetch(urlPost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idUsuario, carrito: carrito.getCarrito() }) // Ajusta el cuerpo según tu estructura
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  
}
