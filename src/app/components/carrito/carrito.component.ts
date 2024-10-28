import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  carrito:Producto [];

  constructor(private carritoService:CarritoService){

    this.carrito=[];

  }
  ngOnInit(): void {
       
    //this.carritoService.getProductos("b751");
    this.carritoService.getCarrito("b751").then((respuestaCarrito)=>this.carrito=respuestaCarrito);
  }
}
