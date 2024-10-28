import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { CategoriasJsonServerService } from '../../../services/categorias-json-server.service';
import { RouterService } from '../../../services/router.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{
  @Input("id") idProducto!: string;
  producto : Producto;
  categorias : [];

  constructor(private productoService : ProductosJsonServerService,private categoriaService : CategoriasJsonServerService,private router : RouterService){
    this.producto = new Producto("","","","","",0,0,"");
    this.categorias = [];
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
}
