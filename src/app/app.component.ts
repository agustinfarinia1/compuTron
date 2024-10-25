import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/herramientas/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { ProductosJsonServerService } from './services/productos-json-server.service';
import { CategoriasJsonServerService } from './services/categorias-json-server.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  titulo = "Computron";

  constructor(private auth:AuthService,private productos: ProductosJsonServerService,private categorias : CategoriasJsonServerService){}

  ngOnInit(): void {
    this.productos.getProductos().then((respuestaProductos) => localStorage.setItem("productos",respuestaProductos));
    this.categorias.getCategorias().then((respuestaProductos) => localStorage.setItem("categorias",respuestaProductos));
  }

  verificarLogueo () {
    return this.auth.isAuth();
  }
}
