import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-producto-item',
  standalone: true,
  imports: [],
  templateUrl: './producto-item.component.html',
  styleUrl: './producto-item.component.css'
})
export class ProductoItemComponent{

  @Input() listaCategorias: [];
  @Input() producto:Producto;
  @Input() indice : number;

  constructor() {
    this.producto = new Producto("","","","","",1,1,"");
    this.indice = 1;
    this.listaCategorias = [];
  }

  getCategoriaPorValor = (valor : string) => {
    if(this.listaCategorias){
      const respuesta : any = this.listaCategorias.find((respuesta : any) => respuesta.id === valor);
      if(respuesta){
        return respuesta.valor;
      }
    }
  }
}
