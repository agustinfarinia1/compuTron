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
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  carrito : Carrito;
  cargaCarrito : boolean;

  constructor(private carritoService:CarritoService){
    this.carrito = new Carrito("","");
    this.cargaCarrito = false;
  }
  ngOnInit(): void {


    this.carritoService.getCarritoServer("b751").then((respuestaCarrito) => {
      this.carrito = respuestaCarrito;
      this.cargaCarrito = true; // Cambiado aquí
    });

    // //this.carritoService.getProductos("b751");
    // this.carritoService.getCarritoServer("b751").then((respuestaCarrito) => this.carrito = respuestaCarrito);
    // this.cargaCarrito = true;
  }


  eliminarDelCarrito(productId: string) {
    const indiceProducto = this.carrito.getCarrito().findIndex(producto => producto.getId() === productId);
    
    if (indiceProducto >= 0) {
      this.carrito.getCarrito().splice(indiceProducto, 1); // Elimina el producto del carrito
      this.carritoService.setCarritoServer(this.carrito.getIdUsuario(), this.carrito); // Actualiza el carrito en el servidor
    }
  }
  
  cambiarCantidad(productId: string, delta: number) {
    const producto = this.carrito.getCarrito().find(p => p.getId() === productId);
    if (producto) {
      let nuevaCantidad = producto.getCantidad() + delta;
      if (nuevaCantidad >= 1) {
        producto.setCantidad(nuevaCantidad);
        this.carritoService.setCarritoServer(this.carrito.getIdUsuario(), this.carrito);
      }
    }
  }
  // carrito.component.ts

  calcularPrecioTotal(producto: Producto): number {
    return producto.getPrecio() * producto.getCantidad();
  }

  

}
