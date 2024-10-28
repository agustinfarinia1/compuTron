import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { CategoriasJsonServerService } from '../../../services/categorias-json-server.service';
import { RouterService } from '../../../services/router.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";

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

  constructor(private productoService : ProductosJsonServerService,private categoriaService : CategoriasJsonServerService,private router : RouterService){
    this.producto = new Producto("","","","","",0,0,"");
    this.categorias = [];
    this.maximo = 2;
    this.carritoFormulario = new FormGroup({
      cantidad : new FormControl(1,[Validators.required,Validators.min(1)]),
    })
  }

  ngOnInit(): void {
    if(this.idProducto){
      this.productoService.consultarCodigo(this.idProducto).then((respuestaProducto) => this.producto = respuestaProducto[0]);
      this.categoriaService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias);
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

  agregarAlCarrito () {
   
    this.getCarrito();

  }

  onSubmit () {
    console.log(this.idProducto);
    console.log(this.carritoFormulario.value);
  }
}
