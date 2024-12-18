// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterService } from '../../../services/router.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './logueo.component.html',
  styleUrl: './logueo.component.css'
})
export class LogueoComponent {
  loginData = { nombreUsuario: '', contrasena: '' };

  constructor(private authService: AuthService, private router: RouterService) {}

  iniciarSesion() {
    this.authService.login(this.loginData.nombreUsuario, this.loginData.contrasena)
      .then(success => {
        if (success) {
          alert('Inicio de sesión exitoso');
          this.router.irAHome();
        } else {
          this.loginData.nombreUsuario = "";
          this.loginData.contrasena = "";
          alert('Usuario o contraseña incorrectos');
        }
      });
  }
}
