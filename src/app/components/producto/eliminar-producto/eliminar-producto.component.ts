import { Component, Input, OnInit } from '@angular/core';
import { ProductosJsonServerService } from '../../../services/productos-json-server.service';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.css'
})
export class EliminarProductoComponent implements OnInit{
  @Input("id") idProducto!: string;

  producto : Producto;

  constructor(private productoService : ProductosJsonServerService,private router: RouterService){
    this.producto = new Producto("","","","","",0,0,"");
  }

  ngOnInit(): void {
    if(this.idProducto){
      this.productoService.consultarCodigo(this.idProducto).then((respuestaProducto) => this.producto = respuestaProducto[0]);
    }
  }

  volverInicio () {
    this.router.irAHome();
  }

  eliminarProducto (producto : Producto) {
    producto.setEliminado(true);
    this.productoService.editarProducto(producto);
    this.router.irAHome();
  }
}
