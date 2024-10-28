import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { ProductoItemComponent } from "../producto-item/producto-item.component";
import { CategoriasJsonServerService } from '../../../services/categorias-json-server.service';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ProductoItemComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  @Input() listaProductos : Producto[];
  @Input() categoriaListado : string;
  listaCategorias : [];

  constructor(private categoriasServicio:CategoriasJsonServerService,private productosServicio:ProductosJsonServerService) {
    this.listaProductos = [];
    this.listaCategorias = [];
    this.categoriaListado = "";
  }

  ngOnInit(): void {
    this.categoriasServicio.getCategorias().then((respuestaCategorias) => this.listaCategorias = respuestaCategorias);
    if(!this.categoriaListado){
      this.productosServicio.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
    }
    else{
      this.productosServicio.getProductosPorCategoria(this.categoriaListado).then((respuestaProductos) => this.listaProductos = respuestaProductos);
    }
  }
}
