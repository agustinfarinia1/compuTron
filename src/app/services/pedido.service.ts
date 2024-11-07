import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

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

  getCategorias = async() => {
    const url = `http://localhost:3000/pedidos`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos;
        } catch (error) {
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
