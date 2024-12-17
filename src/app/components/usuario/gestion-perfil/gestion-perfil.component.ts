// gestion-perfil.component.ts
import { Component, OnInit } from '@angular/core';

import { Persona } from '../../../models/persona.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-perfil.component.html',
})
export class GestionPerfilComponent implements OnInit {
  usuario!: Persona; // Se inicializa en ngOnInit desde localStorage
  mensajeConfirmacion: string = '';
  fechaActual : Date;
  fechaMinima : Date;

  constructor(private authService: AuthService) {
    this.fechaActual = new Date();
    this.fechaMinima = this.fechaActual;
    this.fechaActual.setFullYear(this.fechaActual.getFullYear() - 18);
  }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  guardarCambios() {
    // Validacion fecha de nacimiento
    let fechaComprobacion = new Date(this.usuario.fechaNacimiento);
    if((fechaComprobacion <= this.fechaMinima) && (fechaComprobacion.getFullYear() > 1900)){
      this.authService.actualizarPerfil(this.usuario).subscribe({
        next: (usuarioActualizado) => {
          localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
          this.mensajeConfirmacion = 'Los cambios han sido guardados exitosamente.';
        },
        error: (error) => {
          console.error('Error al guardar los cambios:', error);
          this.mensajeConfirmacion = 'Hubo un problema al guardar los cambios. Inténtalo nuevamente.';
        }
      });
    }
    else{
      alert("ERROR: su fecha de nacimiento es erronea");
    }
  }
}

