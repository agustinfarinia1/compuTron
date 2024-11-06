import { Injectable } from '@angular/core';
import { MetodoDePago } from '../models/metodoDePago.model';

@Injectable({
  providedIn: 'root'
})
export class MetodosDePagoService {

  getMetodosDePago = async() => {
    const url = `http://localhost:3000/metodosDePago`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((item: any) => new MetodoDePago(item.id,item.valor));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }
}
