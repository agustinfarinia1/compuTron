import { Component, OnInit } from '@angular/core';
import { ListaProductosComponent } from "../producto/lista-productos/lista-productos.component";
import { AuthService } from '../../services/auth.service';
import { RouterService } from '../../services/router.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListaProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private auth:AuthService,private router:RouterService, private carritoService:CarritoService){}

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()){
      localStorage.setItem("token","");
      this.router.irALogin();
    }
    else{
      let respuestaUsuario = localStorage.getItem("usuario");
      if(respuestaUsuario){
        let usuario = JSON.parse(respuestaUsuario);
        if(usuario){
          if(!localStorage.getItem("cantidadCarrito")){ 
            // Si es la primera vez que ingresa al sistema, se crea en el localStorage la cantidad de carrito que aparece en en navbar
            this.carritoService.getCarritoServer(usuario.id).then((respuestaCarrito) => {
              let carrito = respuestaCarrito?.getCarrito();
              if(carrito){
                let totalCarrito = 0;
                carrito.forEach((item) => totalCarrito = totalCarrito + item.getCantidad());
                localStorage.setItem("cantidadCarrito",totalCarrito.toString());
              }
            });
          }
        }
      }
    }
  }

  irAProductos() {
    this.router.irAProductos();
  }
}
