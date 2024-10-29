import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../models/carrito.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  carrito : Carrito;
  cargaCarrito : boolean;

  constructor(private carritoService:CarritoService){
    this.carrito = new Carrito("","");
    this.cargaCarrito = false;
  }
  ngOnInit(): void {

    //this.carritoService.getProductos("b751");
    this.carritoService.getCarritoServer("b751").then((respuestaCarrito) => this.carrito = respuestaCarrito);
    this.cargaCarrito = true;
  }



}
