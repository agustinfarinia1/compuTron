import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../models/carrito.model';
import { RouterService } from '../../services/router.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'], // Corrige 'styleUrl' a 'styleUrls'
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null;
  cargaCarrito: boolean;
  productos : Producto [];
  precioTotal : number;

  constructor(private carritoService: CarritoService,private productosService : ProductosService,private router:RouterService) {
    this.carrito = null;
    this.cargaCarrito = false;
    this.productos = [];
    this.precioTotal = 0;
    // No es necesario inicializar carrito aquí, se obtiene del servidor
  }

  ngOnInit(): void {
    this.obtenerCarrito();
    this.productosService.getProductos().then((respuestaProductos) => {
      this.productos = respuestaProductos});
  }

  async obtenerCarrito() {
    let usuario;
    try {
      usuario = localStorage.getItem("usuario");
      if(usuario){
        usuario = JSON.parse(usuario);
        this.carrito = await this.carritoService.getCarritoServer(usuario.id);
        if(this.carrito){
          this.cargaCarrito = true;
        }
      }
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

  calcularPrecioProducto(producto: Producto): number {
    this.precioTotal = this.precioTotal + (producto.getPrecio() * producto.getCantidad());
    return producto.getPrecio() * producto.getCantidad();
  }

  getTotalCarrito () {
    let precio = 0;
    this.carrito?.getCarrito().forEach(productoCarrito => {
      precio = precio + this.calcularPrecioProducto(productoCarrito);
    });
    return precio;
  }

  consultarStockProducto (productoConsulta : Producto) {
    let respuesta = true;
    let producto = this.productos.find(producto => producto.getId() === productoConsulta.getId());
    if(producto){
      if(productoConsulta.getCantidad() > producto.getCantidad()){
        respuesta = false;
      }
    }
    return respuesta;
  }

  continuarCarrito() {
    let productosSinStock : any[]= [];
    let verificacionCarrito = false;
    if(this.carrito){
      this.carrito.getCarrito().forEach(carritoItem => {
        let producto = this.consultarStockProducto(carritoItem);
        if(producto === false){
          verificacionCarrito = true;
          productosSinStock.push(carritoItem.getTitulo());
        }
      });
      if(verificacionCarrito){
        if(productosSinStock.length > 0){
          productosSinStock.forEach((productoSinStock) =>{
            alert(`Error-El producto ${productoSinStock} se encuentra sin stock, por favor reduzca la cantidad o producto similar.`);
          }) 
        }
      }
      else{
        localStorage.setItem("totalCarrito",this.getTotalCarrito().toString());
        this.router.irAConfirmarPedido();
      }
    }
  }
}
