import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterService } from '../../../services/router.service';
import { AuthService } from '../../../services/auth.service';
import { ContadorCarritoComponent } from '../../carrito/contador-carrito/contador-carrito.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, ContadorCarritoComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  titulo = "Computron";
  rol: string | null = null;

  constructor(private authService: AuthService, private router: RouterService) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol'); // Obtener el rol del usuario
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.irALogin();
  }
}
