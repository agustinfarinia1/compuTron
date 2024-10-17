import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent {

  campoCodigo : string = "";
  campoNombre : string = "";
  campoCategoria : string = "";
  campoMarca : string = "";
  campoCantidad : number = 1;
  campoPrecio : number = 1;
  listaProductos : Producto[] = [
    new Producto("P001","memoria ram ddr3","memoria ram","kingston",3,20000),
    new Producto("P002","memoria ram ddr4","memoria ram","kingston",5,25000),
    new Producto("P003","memoria ram ddr5","memoria ram","kingston",2,40000),
    new Producto("P004","procesador amd am4","procesador","amd",5,70000),
    new Producto("P005","procesador amd am5","procesador","amd",2,100000),
    new Producto("P006","placa de video","placa de video","saphire",3,110000),
    new Producto("P007","placa de video RTX","placa de video","Nvidia",5,250000),
    new Producto("P008","Placa madre A320M","placa madre","Asrock",2,90000),
    new Producto("P009","Placa madre A620M","placa madre","gigabyte",5,150000),
    new Producto("P0010","Placa madre Intel","placa madre","Asus",2,120000)];

  registrarProducto = () =>{
    let producto : Producto = new Producto(this.campoCodigo,this.campoNombre,this.campoCategoria,this.campoMarca,this.campoCantidad,this.campoPrecio);
    this.listaProductos.push(producto);
  }
}
