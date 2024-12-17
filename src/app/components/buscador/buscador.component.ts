import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  @Output() onBuscar = new EventEmitter<string>();
  query: string = '';

  buscar() {
    this.onBuscar.emit(this.query); // Emitir el valor de búsqueda
  }
}
