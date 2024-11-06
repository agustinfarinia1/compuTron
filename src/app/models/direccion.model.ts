export class Direccion {
  calle: string;
  numero: number;
  piso?: string; // Opcional
  departamento?: string; // Opcional

  constructor(calle: string, numero: number, piso?: string, departamento?: string) {
    this.calle = calle;
    this.numero = numero;
    this.piso = piso;
    this.departamento = departamento;
  }
}
