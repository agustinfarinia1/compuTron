import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //Setea un producto nuevo.
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

  //Edita un producto, por su ID
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

  // Obtiene un arreglo de los productos existentes en el sistema (que tengan stock y no esten eliminados)
  getProductos = async() => {
    const url = `http://localhost:3000/stock?cantidad_gt=0&eliminado=false`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((item: any) => new Producto(item.codigoML,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen,item.id));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  // Obtiene productos por una categoria proporcionada por parametro.
  getProductosPorCategoria = async(categoria : string) => {
    const url = `http://localhost:3000/stock?categoria=${categoria}&cantidad_gt=0&eliminado=false`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((item: any) => new Producto(item.codigoML,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen,item.id));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  //Obtiene la cantidad de productos totales.
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

  //Obtiene un producto por ID
  consultarCodigo = async(codigo : string) => {
    const url = `http://localhost:3000/stock?id=${codigo}&eliminado=false`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return await datos.map((item: any) => new Producto(item.codigoML,item.titulo,item.categoria,item.marca,item.modelo,item.cantidad,item.precio,item.imagen,item.id));
      }
    catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }
}
