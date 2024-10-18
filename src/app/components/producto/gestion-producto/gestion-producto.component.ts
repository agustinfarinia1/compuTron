import { Component, OnInit } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { Producto } from '../../../models/producto.model';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [FormularioProductoComponent, ListaProductosComponent],
  templateUrl: './gestion-producto.component.html',
  styleUrl: './gestion-producto.component.css'
})
export class GestionProductoComponent implements OnInit {

  listaProductos: Producto[];

  constructor(private jsonServerServicio: ProductosJsonServerService) {
    this.listaProductos = [];
  }

  ngOnInit(): void {
    this.jsonServerServicio.getStock().then((respuesta) => this.listaProductos = respuesta);
  }

  cargarProducto = (producto: Producto) => {
    this.listaProductos.push(producto);
    this.jsonServerServicio.setNewProductoStock(producto);
  }
}
