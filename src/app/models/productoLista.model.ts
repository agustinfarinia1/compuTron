export class ProductoLista{

  private id:string;
  private cantidad : number;

  constructor(newId : string,newCantidad : number){
    this.id = newId;
    this.cantidad = newCantidad;
  }

  setId = (newId : string) => {
    this.id = newId;
  }

  setCantidad (newCantidad : number){
    this.cantidad = newCantidad;
  }

  getId(){
    return this.id;
  }

  getCantidad () {
    return this.cantidad;
  }
}

