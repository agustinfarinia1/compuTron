import { Direccion } from './direccion.model';

export class Persona {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  contrasena: string;
  fechaNacimiento: Date; // Formato 'YYYY-MM-DD'
  codigoPostal: string;
  direccion: Direccion; // Referencia al modelo Direccion

  constructor(
    email: string,
    nombre: string,
    apellido: string,
    nombreUsuario: string,
    contrasena: string,
    fechaNacimiento: Date,
    codigoPostal: string,
    direccion: Direccion, // Ahora acepta un objeto Direccion
    id: string = ""
  ) {
    this.id = id;
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreUsuario = nombreUsuario;
    this.contrasena = contrasena;
    this.fechaNacimiento = fechaNacimiento;
    this.codigoPostal = codigoPostal;
    this.direccion = direccion; // Inicializa con el objeto Direccion
  }
}
