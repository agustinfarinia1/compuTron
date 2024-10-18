import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { ProductoItemComponent } from "../producto-item/producto-item.component";
import { CategoriasJsonServerService } from '../../../services/categorias-json-server.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ProductoItemComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  listaCategorias : [];

  @Input() listaProductos:Producto[];

  constructor(private categoriasServicio:CategoriasJsonServerService) {
    this.listaProductos = [];
    this.listaCategorias = [];
  }

  ngOnInit(): void {
    this.categoriasServicio.getCategorias().then((respuesta) => this.listaCategorias = respuesta);
  }
}
