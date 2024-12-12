import { Injectable } from '@angular/core';
import { MetodoDePago } from '../models/metodoDePago.model';

@Injectable({
  providedIn: 'root'
})
export class MetodosDePagoService {

  // Genera un nuevo metodo de pago.
  setNewMetodoDePago = async(newMetodoDePago : MetodoDePago) => {
    try{
      const url = `http://localhost:3000/metodos-de-pago`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMetodoDePago)
      })
      return this.getCantidadMetodoDePago();
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  // Obtiene todos los metodos de pagos.
  getMetodosDePago = async() => {
    const url = `http://localhost:3000/metodos-de-pago`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((item: any) => new MetodoDePago(item.id,item.valor));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  //Obtiene la cantidad total de metodos de pagos
  getCantidadMetodoDePago = async() => {
    const url = `http://localhost:3000/metodos-de-pago`;
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
