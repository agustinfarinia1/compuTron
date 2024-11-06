import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { CategoriasJsonServerService } from '../../../services/categorias-json-server.service';
import { RouterService } from '../../../services/router.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { CarritoService } from '../../../services/carrito.service';
import { Carrito } from '../../../models/carrito.model';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListaProductosComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{
  @Input("id") idProducto!: string;
  producto : Producto;
  categorias : [];
  carritoFormulario : FormGroup;
  carrito: Carrito | null = null;

  constructor(private productoService : ProductosJsonServerService,private carritoService:CarritoService,private categoriaService : CategoriasJsonServerService,private router : RouterService){
    this.producto = new Producto("","","","","",0,0,"");
    this.categorias = [];
    this.carritoFormulario = new FormGroup({
      cantidad : new FormControl(1,[Validators.required,Validators.min(1)]),
    })
    this.carrito = new Carrito("","");
  }

  ngOnInit(): void {
    if(this.idProducto){
      this.productoService.consultarCodigo(this.idProducto).then((respuestaProducto) => {
        this.producto = respuestaProducto[0];
      });
      this.categoriaService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias);
      let usuarioStorage = localStorage.getItem("usuario");
      if(usuarioStorage){
        let usuario = JSON.parse(usuarioStorage);
        this.carritoService.getCarritoServer(usuario.id).then((respuestaCarrito) => this.carrito = respuestaCarrito);
      }
    }
  }

  buscarCategoria (idCategoria : string){
    let categoria : any= this.categorias.find((busquedaCategoria : any) => busquedaCategoria.id === idCategoria);
    if(categoria){
      return categoria.valor;
    }
    return null;
  }

  volverAlInicio () {
    this.router.irAHome();
  }

  agregarCarrito(): void {  
    alert('Se a agregado al carrito. Cantidad: ' + this.carritoFormulario.get('cantidad')?.value);
  }


  async onSubmit () {
    let cantidad = 0;
    let usuario;
    let productoFinal = this.producto;
    productoFinal.setCantidad(this.carritoFormulario.get('cantidad')?.value);
    if (this.carrito) {
      this.carrito.cargarCarrito(productoFinal);
      usuario = localStorage.getItem("usuario");
      if(usuario){
        usuario =JSON.parse(usuario);
        this.carrito.setIdUsuario(usuario.id);
        let respuestaCantidad = localStorage.getItem("cantidadCarrito");
        if(respuestaCantidad){
          cantidad = JSON.parse(respuestaCantidad)+productoFinal.getCantidad();
        }
        else{
          cantidad = productoFinal.getCantidad();
        }
        localStorage.setItem("cantidadCarrito",cantidad.toString());
        await this.carritoService.setCarritoServer(usuario.id, this.carrito);
      }
  } else {
      console.error("El carrito es null. No se puede cargar el carrito.");
      // Puedes manejar el caso en que el carrito es null, por ejemplo, creando un nuevo carrito
  }

  }
}
