import { Injectable } from '@angular/core';
import { EstadoPedido } from '../models/estadoPedido.model ';

@Injectable({
  providedIn: 'root'
})
export class EstadoPedidoService {

  constructor() { }

  // Genera un nuevo estadoPedido en JsonServer
  setNewEstadoPedido = async(newEstadoPedido : EstadoPedido) => {
    try{
      const url = `http://localhost:3000/estado-pedido`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEstadoPedido)
      })
      return this.getCantidadEstadoPedido();
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  // Edita un estadoPedido en  el jsonServer, dependiendo el ID
  editarEstadoPedido = async(estadoPedido : EstadoPedido) => {
    try{
      const url = `http://localhost:3000/estado-pedido/${estadoPedido.getId()}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estadoPedido)
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  //Obtiene todos los estadosPedido
  getEstadoPedido = async() => {
    const url = `http://localhost:3000/estado-pedido`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((estadoPedido : any) => new EstadoPedido(estadoPedido.id,estadoPedido.valor));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  // Obtiene la cantidad total de estadoPedido.
  getCantidadEstadoPedido = async() => {
    const url = `http://localhost:3000/estado-pedido`;
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
