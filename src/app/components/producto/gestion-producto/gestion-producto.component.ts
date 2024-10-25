import { Component, OnInit } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { Producto } from '../../../models/producto.model';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [ListaProductosComponent,RouterLink],
  templateUrl: './gestion-producto.component.html',
  styleUrl: './gestion-producto.component.css'
})
export class GestionProductoComponent implements OnInit {

  listaProductos: Producto[];

  constructor(private productosServicio: ProductosJsonServerService) {
    this.listaProductos = [];

  }

  ngOnInit(): void {
    this.productosServicio.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
  }
}
