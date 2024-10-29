import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Carrito } from '../models/carrito.model';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  listaProductos: Carrito;
  constructor() {
    this.listaProductos=new Carrito();
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
  
  setCarrito = async(idUsuario:string, producto:Producto) => {
   
    this.listaProductos.cargarCarrito(producto);
    try{
      const url = `http://localhost:3000/usuarios?id=${idUsuario}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.listaProductos.getCarrito())
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }
    cargainicialCarrito(idUsuario:string){

    this.getCarrito(idUsuario).then((respuestaGet)=>this.listaProductos=respuestaGet);
    return this.listaProductos; 

  }

}
