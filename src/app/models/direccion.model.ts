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

  setPiso(newPiso : string){
    this.piso = newPiso;
  }

  setDepartamento(newDepartamento : string){
    this.departamento = newDepartamento;
  }

  getCalle(){
    return this.calle;
  }

  getNumero(){
    return this.numero;
  }

  getPiso(){
    return this.piso;
  }

  getDepartamento(){
    return this.departamento;
  }
}
