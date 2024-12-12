import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { RouterService } from '../../../services/router.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { CarritoService } from '../../../services/carrito.service';
import { Carrito } from '../../../models/carrito.model';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { MensajesComponent } from "../../herramientas/mensajes/mensajes.component";

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListaProductosComponent, MensajesComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit,OnChanges {
  @Input("id") idProducto!: string;
  producto: Producto | null;
  categorias: any[] = [];
  carritoFormulario: FormGroup;
  carrito: Carrito | null = null;
  private currentUserId: string = '';
  mostrarMensaje : boolean;
  mensajeTexto : string;

  constructor(private productoService : ProductosService,private carritoService:CarritoService,private categoriaService : CategoriasService,private router : RouterService){
    this.producto = null;
    this.categorias = [];
    this.mostrarMensaje = false;
    this.mensajeTexto = "Se Agregaron productos al carrito correctamente!";
    this.carritoFormulario = new FormGroup({
      cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  async ngOnInit(): Promise<void> {
    if(this.idProducto){
      this.cargarProducto();
    }
  }

  ngOnChanges(): void {
    if(this.idProducto){
      this.cargarProducto();
      this.carritoFormulario.get("cantidad")?.setValue(1);
    }
  }

  async cargarProducto(){
    if (this.idProducto) {
      await Promise.all([
        this.productoService.consultarCodigo(this.idProducto).then((respuestaProducto) => {
          this.producto = respuestaProducto[0];
        }),
        this.categoriaService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias)
      ]);

      const usuarioStorage = localStorage.getItem("usuario");
      if (usuarioStorage) {
        const usuario = JSON.parse(usuarioStorage);
        await this.initializeUserCart(usuario.id);
      }
    }
  }

  private async clearCartData() {
    localStorage.removeItem('cantidadCarrito');
    localStorage.removeItem('carritoId');
    this.carrito = null;
  }
  // por si el usuario es diferente, lo limpiamos todo
  private async initializeUserCart(userId: string) {  
    if (this.currentUserId !== userId) {
      await this.clearCartData();
      this.currentUserId = userId;
    }

    try {
      const serverCart = await this.carritoService.getCarritoServer(userId);
      
      if (serverCart) {
        // Si existe un carrito en el servidor, lo usamos
        this.carrito = serverCart;
        localStorage.setItem('carritoId', serverCart.getId());
      } else {
        // Si no existe, creamos uno nuevo
        const cartId = crypto.randomUUID();
        this.carrito = new Carrito(cartId, userId);
        await this.carritoService.setCarritoServer(userId, this.carrito);
        localStorage.setItem('carritoId', cartId);
      }

      // Actualizamos la cantidad total
      const totalQuantity = this.carrito.getTotalProductos();
      localStorage.setItem('cantidadCarrito', totalQuantity.toString());
      
    } catch (error) {
      console.error("Error initializing cart:", error);
      // En caso de error, creamos un carrito nuevo
      const cartId = crypto.randomUUID();
      this.carrito = new Carrito(cartId, userId);
      await this.carritoService.setCarritoServer(userId, this.carrito);
      localStorage.setItem('carritoId', cartId);
      localStorage.setItem('cantidadCarrito', '0');
    }
  }

  buscarCategoria(idCategoria: string) {
    const categoria = this.categorias.find((busquedaCategoria: any) => busquedaCategoria.id === idCategoria);
    return categoria ? categoria.valor : null;
  }

  volverAlInicio() {
    this.router.irAHome();
  }

  async agregarCarrito() {
    if (!this.carritoFormulario.valid) {
      alert('Por favor ingrese una cantidad válida');
      return;
    }
    await this.onSubmit();
  }

  private async onSubmit() {
    const usuarioStorage = localStorage.getItem("usuario");
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage);
      if(usuario && this.carrito){
        if(this.producto){
          const cantidadNueva = this.carritoFormulario.get('cantidad')?.value || 0;
          const productoFinal = new Producto(
            this.producto.getCodigoML(),
            this.producto.getTitulo(),
            this.producto.getCategoria(),
            this.producto.getMarca(),
            this.producto.getModelo(),
            cantidadNueva,
            this.producto.getPrecio(),
            this.producto.getImagen(),
            this.producto.getId()
          );
      
          this.carrito.cargarCarrito(productoFinal);
          const cantidadTotal = this.carrito.getTotalProductos();
          localStorage.setItem('cantidadCarrito', cantidadTotal.toString());
      
          await this.carritoService.setCarritoServer(usuario.id, this.carrito);
          this.mostrarMensaje = true;
        }
      }
    }
  }
}