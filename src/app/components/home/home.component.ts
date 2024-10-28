import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListaProductosComponent } from "../producto/lista-productos/lista-productos.component";
import { AuthService } from '../../services/auth.service';
import { RouterService } from '../../services/router.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ListaProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private auth:AuthService,private router:RouterService, private carritoService:CarritoService){}

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()){
      localStorage.setItem("token","");
      this.router.irALogin();
      this.carritoService.cargarCarrito("b751");
    }
  }
}
