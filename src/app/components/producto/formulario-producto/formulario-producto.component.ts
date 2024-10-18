import { Component, Input, model, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { FormsModule } from '@angular/forms';
import { ApiMlService } from '../../../services/servicio-api-ml/servicio-api-ml.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent{

  @Input() accionFormulario!: (producto:Producto) => void;;

  constructor(private servicioMl:ApiMlService){}

  campoBusqueda : string = "";
  campoCodigo : string = "";
  campoTitulo : string = "";
  campoCategoria : string = "";
  campoMarca : string = "";
  campoModelo : string = "";
  campoCantidad : number = 1;
  campoPrecio : number = 1;
  campoImagen : string = "";
  respuestaApi : [] = [];

  buscarProductos = () => {
    this.servicioMl.getData(this.campoBusqueda).then((e) => this.respuestaApi = e);
  }

  seleccionProducto = (valor : Event) => {
    const selectElement = valor.target as HTMLSelectElement;
    const producto : any = this.respuestaApi[parseInt(selectElement.value)];
    const marca = this.obtenerCampo(producto["attributes"],"BRAND");
    const modelo = this.obtenerCampo(producto["attributes"],"MODEL");
    if(producto){
      this.campoCodigo = producto.id;
      this.campoTitulo = producto.title;
      this.campoPrecio = producto.price;
      this.campoImagen = producto.thumbnail;
      if(marca){
        this.campoMarca = marca;
      }
      if(modelo){
        this.campoModelo = modelo;
      }
    }
  }
obtenerCampo = (producto : any[],campo : string) => {
    return producto.find((f) => f.id === campo).value_name;
}

  submitFormulario = () =>{
    let producto : Producto = new Producto(this.campoCodigo,this.campoTitulo,this.campoCategoria,this.campoMarca,this.campoModelo,this.campoCantidad,this.campoPrecio,this.campoImagen);
    this.accionFormulario(producto);
  }
}
