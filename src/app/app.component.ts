import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/herramientas/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "./components/herramientas/footer/footer.component";
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule, HttpClientModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  titulo = "Computron";

  constructor(private auth:AuthService,private productos: ProductosService,private categorias : CategoriasService){}

  ngOnInit(): void {
    this.productos.getProductos().then((respuestaProductos) => localStorage.setItem("productos",respuestaProductos));
    this.categorias.getCategorias().then((respuestaProductos) => localStorage.setItem("categorias",respuestaProductos));
  }

  verificarLogueo () {
    return this.auth.isAuthenticated();
  }
}
