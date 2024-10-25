import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { RouterLink } from '@angular/router';
import { ListaProductoAdminComponent } from "../lista-producto-admin/lista-producto-admin.component";

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [RouterLink, ListaProductoAdminComponent],
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
