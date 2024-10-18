import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { ProductoItemComponent } from "../producto-item/producto-item.component";

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ProductoItemComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  @Input() listaProductos:Producto[];

  constructor() {
    this.listaProductos = [];
  }
}
