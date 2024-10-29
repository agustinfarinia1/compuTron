import { Producto } from "./producto.model";

export class Carrito{
  private carrito : Producto[];


  constructor(){
    this.carrito = [];
  }
  getCarrito(){
    return this.carrito;
  }
  cargarCarrito(producto:Producto){

    let indiceProducto =  this.carrito.findIndex((busqueda)=>busqueda.getId()===producto.getId());
    
    if(indiceProducto>=0){
      console.log(indiceProducto);
  //    let cantidadIncial = this.carrito[indiceProducto].getCantidad();
    //this.carrito[indiceProducto].setCantidad(cantidadIncial+producto.getCantidad());
    }else{

      this.carrito.push(producto);
    }

  }

}

