import { Direccion } from "./direccion.model";
import { ProductoLista } from "./productoLista.model";

export class Pedido{

  private id:string;
  private idUsuario : string;
  private fechaCreacion : Date;
  private precioFinal : number;
  private listaPedido : ProductoLista[];
  private idMetodoDePago : string;
  private direccionEnvio : Direccion;
  private idEstadoPedido : string;

  constructor(newId : string,newIdUsuario : string,newFechaCreacion : Date,newPrecioFinal : number,newIdMetodoDePago : string,newDireccionEnvio : Direccion,newIdEstadoPedido : string){
    this.id = newId;
    this.idUsuario = newIdUsuario;
    this.fechaCreacion = newFechaCreacion;
    this.precioFinal = newPrecioFinal;
    this.listaPedido = [];
    this.idMetodoDePago = newIdMetodoDePago;
    this.direccionEnvio = newDireccionEnvio;
    this.idEstadoPedido = newIdEstadoPedido;
  }

  setId = (newId : string) => {
    this.id = newId;
  }

  setIdUsuario (newIdUsuario : string){
    this.idUsuario = newIdUsuario;
  }

  setFechaCreacion (newFechaCreacion: Date){
    this.fechaCreacion = newFechaCreacion;
  }

  setPrecioFinal (newPrecioFinal : number){
    this.precioFinal = newPrecioFinal;
  }

  setListaPedido (){
    this.listaPedido = [];
  }

  setIdMetodoDePago(newIdMetodoDePago : string){
    this.idMetodoDePago = newIdMetodoDePago;
  }

  setDireccionEnvio(newDireccionEnvio : Direccion){
    this.direccionEnvio = newDireccionEnvio;
  }

  setIdEstadoPedido(newIdEstadoPedido : string){
    this.idEstadoPedido = newIdEstadoPedido;
  }

  getId(){
    return this.id;
  }

  getIdUsuario () {
    return this.idUsuario;
  }

  getFechaCreacion () {
    return this.fechaCreacion;
  }

  getPrecioFinal () {
    return this.precioFinal;
  }

  getListaPedido () {
    return this.listaPedido;
  }

  getIdMetodoDePago(){
    return this.idMetodoDePago;
  }

  getDireccionEnvio(){
    return this.direccionEnvio;
  }

  getIdEstadoPedido() {
    return this.idEstadoPedido;
  }
}

