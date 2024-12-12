import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { Direccion } from '../models/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  // Registra nuevo pedido en el JsonServer
  setNewPedido = async(pedido : Pedido) => {
    try{
      const url = `http://localhost:3000/pedidos`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
      })
      return this.getCantidadPedidos();
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  //Edita pedido en el jsonServer, edita el producto con dicho ID
  editarPedido = async(pedido : Pedido) => {
    try{
      const url = `http://localhost:3000/pedidos/${pedido.getId()}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  // Obtiene todos los pedidos con un orden ascendente de estado actual.
  getPedidos = async() => {
    const url = `http://localhost:3000/pedidos?_sort=idEstadoPedido&_order=asc`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        let newPedido = datos.map((respuesta : any) => new Pedido(respuesta.id,respuesta.idUsuario,respuesta.fechaCreacion,respuesta.precioFinal,respuesta.idMetodoDePago,new Direccion(respuesta.direccionEnvio.calle,respuesta.direccionEnvio.numero,respuesta.direccionEnvio.piso,respuesta.direccionEnvio.departamento),respuesta.idEstadoPedido,respuesta.listaPedido));
        return newPedido;
      } 
    catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  // Obtiene los pedidos de un usuario especifico.
  getPedidosUsuario = async(idUsuario : string) => {
    const url = `http://localhost:3000/pedidos/?idUsuario=${idUsuario}&_sort=idEstadoPedido&_order=asc`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        let newPedido = datos.map((respuesta : any) => new Pedido(respuesta.id,respuesta.idUsuario,respuesta.fechaCreacion,respuesta.precioFinal,respuesta.idMetodoDePago,new Direccion(respuesta.direccionEnvio.calle,respuesta.direccionEnvio.numero,respuesta.direccionEnvio.piso,respuesta.direccionEnvio.departamento),respuesta.idEstadoPedido,respuesta.listaPedido));
        return newPedido;
      } 
    catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  // Obtiene la cantidad total de pedidos.
  getCantidadPedidos = async() => {
    const url = `http://localhost:3000/pedidos`;
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
