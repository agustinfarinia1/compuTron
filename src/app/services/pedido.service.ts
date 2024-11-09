import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { Direccion } from '../models/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

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

  getPedidos = async() => {
    const url = `http://localhost:3000/pedidos?_sort=idEstadoPedido&_order=asc`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos.map((respuesta : any) => new Pedido(respuesta.id,respuesta.idUsuario,respuesta.fechaCreacion,respuesta.precioFinal,respuesta.idMetodoDePago,new Direccion(respuesta.direccionEnvio.calle,respuesta.direccionEnvio.numero,respuesta.direccionEnvio.piso,respuesta.direccionEnvio.departamento),respuesta.idEstadoPedido));
      } 
    catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

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
