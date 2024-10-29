import { Producto } from "./producto.model";

export class Carrito{

  private id:string;
  private idUsuario : string;
  private carrito : Producto[];

  constructor(newId : string,newIdUsuario : string){
    this.id = newId;
    this.idUsuario = newIdUsuario;
    this.carrito = [];
  }


  cargarCarrito(producto:Producto){

    let indiceProducto =  this.carrito.findIndex((busqueda)=>busqueda.getId()===producto.getId());

    if(indiceProducto >= 0){
      let cantidadIncial = this.carrito[indiceProducto].getCantidad();
      this.carrito[indiceProducto].setCantidad(cantidadIncial+producto.getCantidad());
    }else{
      this.carrito.push(producto);
    }
  }
  getTotalProductos(): number {
    return this.carrito.reduce((total, producto) => total + producto.getCantidad(), 0);
  }

  setId = (newId : string) => {
    this.id = newId;
  }

  setIdUsuario =  (newIdUsuario : string) => {
    this.idUsuario = newIdUsuario;
  }

  setCarrito (newCarrito : Producto []){
    this.carrito = newCarrito.map((item : any) => new Producto(item["codigoML"],item["titulo"],item["categoria"],item["marca"],item["modelo"],item["cantidad"],item["precio"],item["imagen"],item["id"]))
  }

  getId(){
    return this.id;
  }
  getIdUsuario(){
    return this.idUsuario;
  }

  getCarrito () {
    return this.carrito;
  }
}

