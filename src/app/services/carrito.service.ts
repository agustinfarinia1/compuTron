import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  listaProductos: Producto[];
  constructor() {
    this.listaProductos=[];
  }

  getCarrito = async(idUsuario:string) => {
    const url = `http://localhost:3000/usuarios?id=${idUsuario}`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos[0].carrito.map((item: any) => new Producto(item.codigo,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen,item.id));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }
  
  setCarrito = async(idUsuario:string, carrito:Producto[]) => {
    try{
      const url = `http://localhost:3000/usuarios?id=${idUsuario}`;
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
  cargarCarrito(idUsuario:string){

    this.getCarrito(idUsuario).then((respuestaGet)=>this.listaProductos=respuestaGet);
    return this.listaProductos; 

  }

}
