import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-producto-lista-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-lista-pedido.component.html',
  styleUrl: './producto-lista-pedido.component.css'
})
export class ProductoListaPedidoComponent implements OnInit{
  @Input() itemPedido: any | null;
  producto : Producto | null;
  categorias : Categoria[] | null;

  constructor(private productoService : ProductosService,private categoriasService : CategoriasService){
    this.producto = null;
    this.categorias = null;
  }

  ngOnInit(): void {
    if(this.itemPedido){
      this.productoService.consultarCodigo(this.itemPedido.id).then((respuestaProducto) => {
        this.producto = respuestaProducto[0]});
        this.categoriasService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias);
    }
  }

  getCategoriaProducto(idCategoria : string){
    let categoria = null;
    if(this.categorias){
      categoria = this.categorias.find((busquedaCategoria : Categoria) => busquedaCategoria.getId() === idCategoria);
    }
    return categoria;
  }
}
