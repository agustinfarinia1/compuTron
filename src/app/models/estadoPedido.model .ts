export class EstadoPedido{

  private id:string;
  private valor : string;

  constructor(newId : string,newValor : string){
    this.id = newId;
    this.valor = newValor;
  }

  setId = (newId : string) => {
    this.id = newId;
  }

  setValor (newValor : string){
    this.valor = newValor;
  }

  getId(){
    return this.id;
  }

  getValor(){
    return this.valor;
  }
}

