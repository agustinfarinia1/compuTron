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
  maximo : number;
  carrito: Carrito | null = null;

  constructor(private productoService : ProductosJsonServerService,private carritoService:CarritoService,private categoriaService : CategoriasJsonServerService,private router : RouterService){
    this.producto = new Producto("","","","","",0,0,"");
    this.categorias = [];
    this.maximo = 2;
    this.carritoFormulario = new FormGroup({
      cantidad : new FormControl(1,[Validators.required,Validators.min(1)]),
    })
    this.carrito = new Carrito("","");
  }

  ngOnInit(): void {
    if(this.idProducto){
      this.productoService.consultarCodigo(this.idProducto).then((respuestaProducto) => this.producto = respuestaProducto[0]);
      this.categoriaService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias);
      this.carritoService.getCarritoServer("b751").then((respuestaCarrito) => this.carrito = respuestaCarrito);
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


  async onSubmit () {
    let productoFinal = this.producto;
    productoFinal.setCantidad(this.carritoFormulario.get('cantidad')?.value)
    if (this.carrito) {
      this.carrito.cargarCarrito(productoFinal);
      this.carrito.setIdUsuario("b751");
      await this.carritoService.setCarritoServer("b751", this.carrito);
  } else {
      console.error("El carrito es null. No se puede cargar el carrito.");
      // Puedes manejar el caso en que el carrito es null, por ejemplo, creando un nuevo carrito
  }
  
  }
}
