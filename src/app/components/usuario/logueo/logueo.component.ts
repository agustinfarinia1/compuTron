import { Component } from '@angular/core';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-logueo',
  standalone: true,
  imports: [],
  templateUrl: './logueo.component.html',
  styleUrl: './logueo.component.css'
})
export class LogueoComponent {

  constructor(private router:RouterService){}

  iniciarSesion () {
    localStorage.setItem("token","asd123");
    this.router.irAHome();
  }
}
