import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../models/carrito.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'], // Corrige 'styleUrl' a 'styleUrls'
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null = null; // Permitir que sea null
  cargaCarrito: boolean = false; // Define como false por defecto

  constructor(private carritoService: CarritoService) {
    // No es necesario inicializar carrito aquí, se obtiene del servidor
  }

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  async obtenerCarrito() {
    try {
      this.carrito = await this.carritoService.getCarritoServer("b751");
      this.cargaCarrito = this.carrito !== null; // Cambiado aquí
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  }

  eliminarDelCarrito(productId: string) {
    if (this.carrito) { // Verifica si carrito no es null
      const indiceProducto = this.carrito.getCarrito().findIndex(producto => producto.getId() === productId);
      
      if (indiceProducto >= 0) {
        this.carrito.getCarrito().splice(indiceProducto, 1); // Elimina el producto del carrito
        this.carritoService.setCarritoServer(this.carrito.getIdUsuario(), this.carrito); // Actualiza el carrito en el servidor
      }
    }
  }

  cambiarCantidad(productId: string, delta: number) {
    if (this.carrito) { // Verifica si carrito no es null
      const producto = this.carrito.getCarrito().find(p => p.getId() === productId);
      if (producto) {
        let nuevaCantidad = producto.getCantidad() + delta;
        if (nuevaCantidad >= 1) {
          producto.setCantidad(nuevaCantidad);
          this.carritoService.setCarritoServer(this.carrito.getIdUsuario(), this.carrito);
        }
      }
    }
  }

  calcularPrecioTotal(producto: Producto): number {
    return producto.getPrecio() * producto.getCantidad();
  }
}
