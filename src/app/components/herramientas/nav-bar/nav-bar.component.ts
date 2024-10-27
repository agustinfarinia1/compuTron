import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  titulo = "Computron";

  constructor(private router : RouterService){}

  cerrarSesion () {
    localStorage.setItem("token","");
    this.router.irALogin();
  }
}
