import { ProductoLista } from "./productoLista.model";

export class Pedido{

  private id:string;
  private idUsuario : string;
  private fechaCreacion : Date;
  private precioFinal : number;
  private listaPedido : ProductoLista[];
  private idMetodoDePago : string;
  private estadoPedido : string;

  constructor(newId : string,newIdUsuario : string,newFechaCreacion : Date,newPrecioFinal : number,newIdMetodoDePago : string){
    this.id = newId;
    this.idUsuario = newIdUsuario;
    this.fechaCreacion = newFechaCreacion;
    this.precioFinal = newPrecioFinal;
    this.listaPedido = [];
    this.idMetodoDePago = newIdMetodoDePago;
    this.estadoPedido = "a confirmar";
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

  setEstadoAConfirmado(){
    this.estadoPedido = "Confirmado";
  }

  setEstadoAEnviado(){
    this.estadoPedido = "Enviado";
  }

  setEstadoAFinalizado(){
    this.estadoPedido = "Finalizado";
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

  getEstadoPedido() {
    return this.estadoPedido;
  }
}

