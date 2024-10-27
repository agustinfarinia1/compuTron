// login.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './logueo.component.html',
  styleUrl: './logueo.component.css'
})
export class LogueoComponent {
  loginData = { usuario: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.loginData.usuario, this.loginData.password)
      .then(success => {
        if (success) {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      });
  }
}
