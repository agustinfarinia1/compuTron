import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-lista-producto-admin',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './lista-producto-admin.component.html',
  styleUrl: './lista-producto-admin.component.css'
})
export class ListaProductoAdminComponent implements OnInit{

  listaProductos : Producto[];
  listaCategorias : [];

  constructor(private productosService : ProductosService,private categoriasService : CategoriasService){
    this.listaProductos = [];
    this.listaCategorias = [];
  }

  ngOnInit(): void {
    this.productosService.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
    this.categoriasService.getCategorias().then((respuestaCategorias) => this.listaCategorias = respuestaCategorias);
  }

  filtrarCategoria (idCategoria : string) {
    let categoria : any = this.listaCategorias.find((filtroCategoria : any) => filtroCategoria.id === idCategoria);
    if(categoria){
      return categoria.valor;
    }
    return "";
  }
}
