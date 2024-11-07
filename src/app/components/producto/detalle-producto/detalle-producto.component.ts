import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { RouterService } from '../../../services/router.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { CarritoService } from '../../../services/carrito.service';
import { Carrito } from '../../../models/carrito.model';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListaProductosComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  @Input("id") idProducto!: string;
  producto: Producto;
  categorias: any[] = [];
  carritoFormulario: FormGroup;
  carrito: Carrito | null = null;
  private currentUserId: string = '';

  constructor(private productoService : ProductosService,private carritoService:CarritoService,private categoriaService : CategoriasService,private router : RouterService){
    this.producto = new Producto("","","","","",0,0,"");
    this.categorias = [];
    this.carritoFormulario = new FormGroup({
      cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  private async clearCartData() {
    localStorage.removeItem('cantidadCarrito');
    localStorage.removeItem('carritoId');
    this.carrito = null;
  }

  private async initializeUserCart(userId: string) {
    // Si el usuario es diferente, limpiamos todo
    if (this.currentUserId !== userId) {
      await this.clearCartData();
      this.currentUserId = userId;
    }

    try {
      // Intentamos obtener el carrito del servidor
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

  async ngOnInit(): Promise<void> {
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
    if (!usuarioStorage) {
      alert("Debe iniciar sesión para agregar productos al carrito");
      return;
    }

    const usuario = JSON.parse(usuarioStorage);

    // Verificamos si el usuario actual cambió
    if (this.currentUserId !== usuario.id) {
      await this.initializeUserCart(usuario.id);
    }

    if (!this.carrito) {
      alert("Error: No se pudo inicializar el carrito");
      return;
    }

    // Verificamos que el carrito pertenezca al usuario actual
    if (this.carrito.getIdUsuario() !== usuario.id) {
      await this.initializeUserCart(usuario.id);
    }

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
    alert('Producto agregado al carrito exitosamente');
  }
}