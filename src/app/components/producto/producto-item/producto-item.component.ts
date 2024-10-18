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

  @Input() producto:Producto;
  @Input() indice : number;

  constructor() {
    this.producto = new Producto("","","","","",1,1,"");
    this.indice = 1;
  }

}
