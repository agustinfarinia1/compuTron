import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../models/carrito.model';
import { ProductosJsonServerService } from '../../services/productos-json-server.service';

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
  productos : Producto [];

  constructor(private carritoService: CarritoService,private productosService : ProductosJsonServerService) {
    this.productos = [];
    // No es necesario inicializar carrito aquí, se obtiene del servidor
  }

  ngOnInit(): void {
    this.obtenerCarrito();
    this.productosService.getProductos().then((respuestaProductos) => this.productos = respuestaProductos);
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
        let prodcuto = (this.carrito.getCarrito()[indiceProducto]);
        this.cambiarCarritoLocalStorage(-prodcuto.getCantidad());
        this.carrito.getCarrito().splice(indiceProducto, 1); // Elimina el producto del carrito
        this.carritoService.setCarritoServer(this.carrito.getIdUsuario(), this.carrito); // Actualiza el carrito en el servidor
      }
    }
  }

  cambiarCarritoLocalStorage(cantidad : number){
    let cantidadFinal = 0;
    let respuestaCantidad = localStorage.getItem("cantidadCarrito");
    if(respuestaCantidad){
      cantidadFinal = parseInt(respuestaCantidad) + cantidad;
    }
    localStorage.setItem("cantidadCarrito",cantidadFinal.toString());
  }

  incrementarProducto(idProducto : string){
    let productoOriginal = this.productos.find((busquedaProducto) => busquedaProducto.getId() === idProducto);
    if(productoOriginal){
      let respuestaCarrito = this.carrito?.getCarrito().find((busquedaCarrito) => busquedaCarrito.getId() === idProducto);
      if(respuestaCarrito){
        if(respuestaCarrito.getCantidad() < productoOriginal.getCantidad()){
          this.cambiarCarritoLocalStorage(1);
          this.cambiarCantidad(idProducto, 1);
        }
      }
    }
  }

  disminuirProducto(idProducto : string){
    this.cambiarCarritoLocalStorage(-1);
    this.cambiarCantidad(idProducto, -1)
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
  // Método para calcular el total del carrito
  calcularTotalCarrito(): number {
    if (!this.carrito || !this.carrito.getCarrito()) return 0; // Verifica que this.carrito y getCarrito() no sean null
    return this.carrito.getCarrito().reduce((total, producto) => 
      total + (producto.getPrecio() * producto.getCantidad()), 0);
  }

  // Método para manejar el pago del carrito
  pagarCarrito(): void {
    // Aquí puedes implementar la lógica de pago
    alert('Gracias por tu compra. Total pagado: ' + this.calcularTotalCarrito());
    //this.carrito.vaciarCarrito(); // si tienes una función para vaciar el carrito después del pago
  }

}
