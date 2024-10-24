import { ProductosJsonServerService } from "../services/productos-json-server.service";

export class Producto{

  private id : string;
  private codigoML : string;
  private titulo : string;
  private categoria : string;
  private marca : string;
  private modelo : string;
  private cantidad : number;
  private precio : number;
  private imagen : string;
  private eliminado : boolean;

  constructor(newCodigoML : string,newTitulo : string,newCategoria : string,newMarca : string,newModelo : string,newCantidad : number,newPrecio : number,newImagen : string,newId : string = ""){
    this.id = newId;
    this.codigoML = newCodigoML;
    this.titulo = newTitulo;
    this.categoria = newCategoria;
    this.marca = newMarca;
    this.modelo = newModelo;
    this.cantidad = newCantidad;
    this.precio = newPrecio;
    this.imagen = newImagen;
    this.eliminado = false;
  }

  setId = (newId : string) => {
    this.id = newId;
  }

  setCodigoML = (newCodigoML : string) => {
    this.codigoML = newCodigoML;
  }

  setTitulo = (newTitulo : string) => {
    this.titulo = newTitulo;
  }

  setCategoria = (newCategoria : string) => {
    this.categoria = newCategoria;
  }

  setMarca = (newMarca : string) => {
    this.marca = newMarca;
  }

  setModelo = (newModelo : string) => {
    this.modelo = newModelo;
  }

  setCantidad = (newCantidad : number) => {
    this.cantidad = newCantidad;
  }

  setPrecio = (newPrecio : number) => {
    this.precio = newPrecio;
  }

  setImagen = (newImagen : string) => {
    this.imagen = newImagen;
  }

  setEliminado = (newEliminado : boolean) => {
    this.eliminado = newEliminado;
  }

  getId = () => {
    return this.id;
  }

  getCodigoML = ()  => {
    return this.codigoML;
  }

  getTitulo = ()  => {
    return this.titulo;
  }

  getCategoria = () => {
    return this.categoria;
  }

  getMarca = () => {
    return this.marca;
  }

  getModelo = () => {
    return this.modelo;
  }

  getCantidad = () => {
    return this.cantidad;
  }

  getPrecio = () => {
    return this.precio;
  }

  getImagen = () => {
    return this.imagen;
  }

  getEliminado = () => {
    return this.eliminado;
  }
}
