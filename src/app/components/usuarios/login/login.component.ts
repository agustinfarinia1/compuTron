import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginData = { usuario: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Comprobar si el usuario ya está autenticado
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      this.router.navigate(['/home']); // Redirigir si el usuario ya está autenticado
    }
  }

  login() {
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(usuarios => {
      const usuario = usuarios.find(u => u.usuario === this.loginData.usuario && u.password === this.loginData.password);

      if (usuario) {
        // Autenticación exitosa, guardar en localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']); // Redirigir a la página deseada
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}