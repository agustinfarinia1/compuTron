import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/carrito.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contador-carrito',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="contador" style="display: inline-block; background-color: #007BFF; color: white; padding: 5px 10px; border-radius: 20px; font-weight: bold;">
      <span *ngIf="totalProductos > 0">{{ totalProductos }}</span>
      <span *ngIf="totalProductos === 0">0</span>
    </div>
  `,
})
export class ContadorCarritoComponent implements OnInit {
  @Input() idUsuario: string = ''; // Asegúrate de que idUsuario se pase como input
  totalProductos: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carritoService.getCarritoServer(this.idUsuario).then(carrito => {
      if (carrito) {
        this.totalProductos = carrito.getTotalProductos();
      }
    });
  }
}
