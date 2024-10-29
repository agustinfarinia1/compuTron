import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { ProductoItemComponent } from "../producto-item/producto-item.component";
import { CategoriasJsonServerService } from '../../../services/categorias-json-server.service';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ProductoItemComponent, NgxPaginationModule, FormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  @Input() listaProductos : Producto[];
  @Input() categoriaListado : string;
  listaCategorias : [];
  cargaLista : boolean;

  p:number =1 ;

  ordenSeleccionado = 'default';

  constructor(private categoriasServicio:CategoriasJsonServerService,private productosServicio:ProductosJsonServerService) {
    this.listaProductos = [];
    this.listaCategorias = [];
    this.categoriaListado = "";
    this.cargaLista = false;
  }

  ngOnInit(): void {
    this.categoriasServicio.getCategorias().then((respuestaCategorias) => this.listaCategorias = respuestaCategorias);
    if(!this.categoriaListado){
      this.productosServicio.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
    }
    else{
      this.productosServicio.getProductosPorCategoria(this.categoriaListado).then((respuestaProductos) => this.listaProductos = respuestaProductos);
    }
    this.cargaLista = true;
  }

  ordenarProductos() {
    if (this.ordenSeleccionado === 'asc') {
      this.listaProductos.sort((a, b) => a.getPrecio() - b.getPrecio());
    } else if (this.ordenSeleccionado === 'desc'){
      this.listaProductos.sort((a, b) => b.getPrecio() - a.getPrecio());
    }else{
      this.productosServicio.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
    }
  }

}
