import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaProductosComponent } from "./components/producto/lista-productos/lista-productos.component";
import { FormularioProductoComponent } from "./components/producto/formulario-producto/formulario-producto.component";
import { GestionProductoComponent } from "./components/producto/gestion-producto/gestion-producto.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaProductosComponent, FormularioProductoComponent, GestionProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-compuTron';
}
