export class Producto{

  private codigo : string;
  private nombre : string;
  private categoria : string;
  private marca : string;
  private cantidad : number;
  private precio : number;
  private eliminado : boolean;

  constructor(newCodigo:string,newNombre:string,newCategoria:string,newMarca:string,newCantidad:number,newPrecio : number){
    this.codigo = newCodigo;
    this.nombre = newNombre;
    this.categoria = newCategoria;
    this.marca = newMarca;
    this.cantidad = newCantidad;
    this.precio = newPrecio;
    this.eliminado = false;
  }

  setNombre = (newNombre : string) => {
    this.nombre = newNombre;
  }

  setCategoria = (newCategoria : string) => {
    this.categoria = newCategoria;
  }

  setMarca = (newMarca : string) => {
    this.marca = newMarca;
  }

  setCantidad = (newCantidad : number) => {
    this.cantidad = newCantidad;
  }

  setPrecio = (newPrecio : number) => {
    this.precio = newPrecio;
  }

  setEliminado = (newEliminado : boolean) => {
    this.eliminado = newEliminado;
  }

  getCodigo = ()  => {
    return this.codigo;
  }

  getNombre = ()  => {
    return this.nombre;
  }

  getCategoria = () => {
    return this.categoria;
  }

  getMarca = () => {
    return this.marca;
  }

  getCantidad = () => {
    return this.cantidad;
  }

  getPrecio = () => {
    return this.precio;
  }

  getEliminado = () => {
    return this.eliminado;
  }
}
