import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Carrito } from '../models/carrito.model';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: Carrito | null = null; // Cambia para manejar el carrito
  private cantidadTotalSubject = new BehaviorSubject<number>(0);
  cantidadTotal$ = this.cantidadTotalSubject.asObservable();

  constructor() {}

  getCarritoServer = async (idUsuario: string) => {
    const url = `http://localhost:3000/carrito?idUsuario=${idUsuario}`;
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (datos.length > 0) {
        this.carrito = new Carrito(datos[0].id, datos[0].idUsuario);
        this.carrito.setCarrito(datos[0].carrito);
        this.actualizarCantidadTotal();
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    return this.carrito;
  };

  setCarritoServer = async (idUsuario: string, carrito: Carrito) => {
    try {
      const urlGet = `http://localhost:3000/carrito?idUsuario=${idUsuario}`;
      const respuestaGet = await fetch(urlGet);
      const datos = await respuestaGet.json();
  
      if (datos.length > 0) {
        const carritoId = datos[0].id; // Asumiendo que solo hay un carrito por usuario
        const urlPut = `http://localhost:3000/carrito/${carritoId}`; // Cambia a PUT por ID
        // Aquí, extraemos solo los datos necesarios del carrito, como el array de productos
        const carritoData = {
          idUsuario,
          carrito: carrito.getCarrito(), // Asegúrate de que esto sea un array de productos simple
        };
        await fetch(urlPut, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(carritoData),
        });
      } else {
        const urlPost = `http://localhost:3000/carrito`;
        // Asegúrate de enviar solo los datos necesarios
        const carritoData = {
          idUsuario,
          carrito: carrito.getCarrito(),
        };
        await fetch(urlPost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(carritoData),
        });
      }
      this.carrito = carrito; // Actualiza el carrito en el servicio
      this.actualizarCantidadTotal(); // Actualiza la cantidad total después de establecer el carrito
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  cambiarCantidad(productoId: string, cantidad: number): void {
    if (this.carrito) {
      const producto = this.carrito.getCarrito().find((p) => p.getId() === productoId);
      if (producto) {
        producto.setCantidad(Math.max(1, producto.getCantidad() + cantidad)); // Asegura que la cantidad no sea menor a 1
        this.actualizarCantidadTotal(); // Actualiza la cantidad total después de cambiar
      }
    }
  }

  private actualizarCantidadTotal(): void {
    if (this.carrito) {
      const total = this.carrito.getCarrito().reduce((sum, producto) => sum + producto.getCantidad(), 0);
      this.cantidadTotalSubject.next(total); // Emite la nueva cantidad total
    } else {
      this.cantidadTotalSubject.next(0); // Si no hay carrito, la cantidad es 0
    }
  }
}
