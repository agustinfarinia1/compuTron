import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contador-carrito',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contador-carrito.component.html',
  styleUrl: './contador-carrito.component.css'
})
export class ContadorCarritoComponent {
  @Input() idUsuario: string = ''; // Asegúrate de que idUsuario se pase como input

  constructor() {}

  getCarrito() {
    return localStorage.getItem("cantidadCarrito");
  }

  consultaCarrito() {
    let respuestaCarrito = localStorage.getItem("cantidadCarrito");
    if(respuestaCarrito){
      return true;
    }
    else{
      return false;
    }
  }
}
