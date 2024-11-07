import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { RouterLink } from '@angular/router';
import { ListaProductoAdminComponent } from "../lista-producto-admin/lista-producto-admin.component";
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [RouterLink, ListaProductoAdminComponent],
  templateUrl: './gestion-producto.component.html',
  styleUrl: './gestion-producto.component.css'
})
export class GestionProductoComponent implements OnInit {

  listaProductos: Producto[];

  constructor(private productosServicio: ProductosService) {
    this.listaProductos = [];

  }

  ngOnInit(): void {
    this.productosServicio.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
  }
}
