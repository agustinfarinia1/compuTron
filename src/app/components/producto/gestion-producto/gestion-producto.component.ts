import { Component } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [FormularioProductoComponent, ListaProductosComponent],
  templateUrl: './gestion-producto.component.html',
  styleUrl: './gestion-producto.component.css'
})
export class GestionProductoComponent {

  listaProductos : Producto[] = [
    new Producto("P001","memoria ram ddr3","memoria ram","kingston","modelo 1",3,20000,"http://http2.mlstatic.com/D_615774-MLA46552695388_062021-I.jpg"),
    new Producto("P002","memoria ram ddr4","memoria ram","kingston","modelo2",5,25000,"https://http2.mlstatic.com/D_NQ_NP_708523-MLA41594878018_042020-O.webp"),
    new Producto("P003","memoria ram ddr5","memoria ram","kingston","modelo3",2,40000,"http://http2.mlstatic.com/D_615774-MLA46552695388_062021-I.jpg"),
    new Producto("P004","procesador amd am4","procesador","amd","modelo4",5,70000,"https://http2.mlstatic.com/D_NQ_NP_708523-MLA41594878018_042020-O.webp"),
    new Producto("P005","procesador amd am5","procesador","amd","modelo5",2,100000,"http://http2.mlstatic.com/D_615774-MLA46552695388_062021-I.jpg"),
    new Producto("P006","placa de video","placa de video","saphire","modelo6",3,110000,"https://http2.mlstatic.com/D_NQ_NP_708523-MLA41594878018_042020-O.webp"),
    new Producto("P007","placa de video RTX","placa de video","Nvidia","modelo7",5,250000,"http://http2.mlstatic.com/D_615774-MLA46552695388_062021-I.jpg"),
    new Producto("P008","Placa madre A320M","placa madre","Asrock","modelo8",2,90000,"https://http2.mlstatic.com/D_NQ_NP_708523-MLA41594878018_042020-O.webp"),
    new Producto("P009","Placa madre A620M","placa madre","gigabyte","modelo9",5,150000,"http://http2.mlstatic.com/D_615774-MLA46552695388_062021-I.jpg"),
    new Producto("P0010","Placa madre Intel","placa madre","Asus","modelo 10",2,120000,"https://http2.mlstatic.com/D_NQ_NP_708523-MLA41594878018_042020-O.webp")];

    cargarProducto = (producto : Producto) => {
      this.listaProductos.push(producto);
    }
}
