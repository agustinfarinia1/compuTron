import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiMlService {

  constructor() { }

  /*Obtiene informacion de una busqueda especifica realizada 
  en la API de Mercado Libre, limitada a 10 resultados*/
  getData = async(busqueda : string) => {
    const limite : number = 10;
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}&limit=${limite}`;
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      return datos.results;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }
}
