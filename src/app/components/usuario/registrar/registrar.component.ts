import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RegistroService } from '../../../services/registrar.service';
import { Persona } from '../../../models/persona.model';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../services/router.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../../services/auth.service';
import { Carrito } from '../../../models/carrito.model';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensajeError = { email: '', nombreUsuario: '' };
  datosDisponibles = false;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: RouterService,
    private carritoService : CarritoService,
    private authService : AuthService
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          this.alfanumericaValidator 
        ]
      ],
      fechaNacimiento: ['', [Validators.required, this.validarFechaNacimiento]],
      codigoPostal: ['', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        piso: [''],
        departamento: ['']
      })
    });
  }
  // Validador personalizado para la fecha de nacimiento
  validarFechaNacimiento(control: AbstractControl): ValidationErrors | null {
    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    const limiteAnioMinimo = 1900;

    if (isNaN(fechaSeleccionada.getTime())) {
      return null; // No validar si la fecha está vacía
    }
    // No permitir fechas futuras
    if (fechaSeleccionada > hoy ) {
      return { fechaFutura: true };
    }
    if (fechaSeleccionada.getFullYear() < limiteAnioMinimo) {
      return { anioInvalido: true }; // Error: año menor a 1900
    }
  

    // Calcular la edad
    let edad = hoy.getFullYear() - fechaSeleccionada.getFullYear();
    const mes = hoy.getMonth() - fechaSeleccionada.getMonth();
    const dia = hoy.getDate() - fechaSeleccionada.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }

    // Verificar si tiene menos de 18 años
    if (edad < 18) {
      return { menorDeEdad: true };
    }
    return null; // Fecha válida
  }
  // todos los mensajes son para mostrar en consola no para el usuario
  alfanumericaValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const alfanumericaRegex = /^(?=.*[a-zA-Z])(?=.*\d)/; // Al menos una letra y un número
    return alfanumericaRegex.test(value) ? null : { alfanumerica: 'La contraseña debe contener al menos una letra y un número.' };
  }

  verificarDisponibilidad() {
    const { email, nombreUsuario } = this.registroForm.value;

    if (email && nombreUsuario) {
      this.registroService.verificarDatos(nombreUsuario, email).subscribe({
        next: ({ emailDisponible, usuarioDisponible }) => {
          this.mensajeError.email = emailDisponible ? '' : 'Este email ya está registrado';
          this.mensajeError.nombreUsuario = usuarioDisponible ? '' : 'Este nombre de usuario ya está en uso';
          this.datosDisponibles = emailDisponible && usuarioDisponible;
        },
        error: () => {
          this.mensajeError.email = 'Error al verificar disponibilidad';
          this.mensajeError.nombreUsuario = 'Error al verificar disponibilidad';
          this.datosDisponibles = false;
        }
      });
    }
  }

  async onSubmit() {
    if (this.registroForm.valid && this.datosDisponibles) {
      const { email, nombre, apellido, nombreUsuario, contrasena, fechaNacimiento, codigoPostal, direccion } = this.registroForm.value;
      const usuario = new Persona(email, nombre, apellido, nombreUsuario, contrasena, fechaNacimiento, codigoPostal, direccion, 'user');
      (await this.registroService.registrarUsuario(usuario)).subscribe({
        next: (response) => {
          this.mensaje = 'Usuario registrado exitosamente'; // Asignar el mensaje al componente
          this.router.irALogin();
          this.registroForm.reset();
          this.datosDisponibles = false;
          this.authService.consultarUsuario(email).then((respuestaUsuario) => {
            this.carritoService.getCantidadCarritos().then((respuestaCantidad) => {
              let carritoUsuario = new Carrito(respuestaCantidad,respuestaUsuario[0].id);
              this.carritoService.setCarritoServer(respuestaUsuario[0].id,carritoUsuario);
            })
          })
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error.message);
          this.mensaje = `Error al registrar el usuario: ${error.message}`; // En caso de error
        }
      });
    }
  }
  
}
