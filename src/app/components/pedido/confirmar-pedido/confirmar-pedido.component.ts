import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../services/router.service';
import { Pedido } from '../../../models/pedido.model';
import { Direccion } from '../../../models/direccion.model';

@Component({
  selector: 'app-confirmar-pedido',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './confirmar-pedido.component.html',
  styleUrl: './confirmar-pedido.component.css'
})
export class ConfirmarPedidoComponent implements OnInit{

  precioFinal : number;
  precioEnvio : number;
  pedidoFormulario : FormGroup;
  validacionAlternativa : boolean;

  constructor(private router : RouterService){
    this.precioFinal = 0;
    this.precioEnvio = 10000;
    this.validacionAlternativa = true;
    let respuestaPrecio = localStorage.getItem("totalCarrito");
    if(!respuestaPrecio){
      this.router.irAHome();
    }
    else{
      this.precioFinal = JSON.parse(respuestaPrecio);
      localStorage.setItem("precioPedido",(this.precioFinal + this.precioEnvio).toString());
    }

    this.pedidoFormulario = new FormGroup({
      nombreDireccionUsuario : new FormControl("",[Validators.required,Validators.minLength(3)]),
      numeroDireccionUsuario : new FormControl("",[Validators.required,Validators.minLength(1)]),
      pisoDireccionUsuario : new FormControl("",[]),
      departamentoDireccionUsuario : new FormControl("",[]),
      opcionDireccionAlternativa : new FormControl(false,[]),
      nombreDireccionAlternativa : new FormControl("",[]),
      numeroDireccionAlternativa : new FormControl("",[]),
      pisoDireccionAlternativa : new FormControl("",[]),
      departamentoDireccionAlternativa : new FormControl("",[])
    })
    let respuestaUsuario = localStorage.getItem("usuario");
    if(respuestaUsuario){    
      let usuario = JSON.parse(respuestaUsuario);
      if(usuario){
        this.pedidoFormulario.get("nombreDireccionUsuario")?.setValue(usuario.direccion.calle);
        this.pedidoFormulario.get("numeroDireccionUsuario")?.setValue(usuario.direccion.numero);
        if(usuario.direccion.piso){
          this.pedidoFormulario.get("pisoDireccionUsuario")?.setValue(usuario.direccion.piso);
        }
        if(usuario.direccion.departamento){
          this.pedidoFormulario.get("departamentoDireccionUsuario")?.setValue(usuario.direccion.departamento);
        }
      }
      else{
        this.router.irALogin();
      }
    }
  }

  ngOnInit(): void {
    this.cambiarDireccionAlternativa();
  }

  cambiarDireccionAlternativa(){
    this.validacionAlternativa = !this.validacionAlternativa;
    if(this.validacionAlternativa === false){
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.disable();
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.setValidators(null);
      this.pedidoFormulario.get('numeroDireccionAlternativa')?.disable();
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.setValidators(null);
      this.pedidoFormulario.get('pisoDireccionAlternativa')?.disable();
      this.pedidoFormulario.get('departamentoDireccionAlternativa')?.disable();
    }
    else{
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.enable();
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.setValidators([Validators.required]);
      this.pedidoFormulario.get('numeroDireccionAlternativa')?.enable();
      this.pedidoFormulario.get('numeroDireccionAlternativa')?.setValidators([Validators.required]);
      this.pedidoFormulario.get('pisoDireccionAlternativa')?.enable();
      this.pedidoFormulario.get('departamentoDireccionAlternativa')?.enable();
    }
  }

  cargarDireccion(campo : string){
    let nombreDireccion = this.pedidoFormulario.get(`nombreDireccion${campo}`);
    let numeroDireccion = this.pedidoFormulario.get(`numeroDireccion${campo}`);
    if(nombreDireccion?.value && numeroDireccion?.value){
      let direccion = new Direccion(nombreDireccion.value,numeroDireccion.value);
      
      let pisoAlternativa = this.pedidoFormulario.get(`pisoDireccion${campo}`)?.value;
      if(pisoAlternativa){
        direccion.setPiso(pisoAlternativa);
      }
      let departamentoAlternativa = this.pedidoFormulario.get(`departamentoDireccion${campo}`)?.value;
      if(departamentoAlternativa){
        direccion.setDepartamento(departamentoAlternativa);
      }
      return direccion;
    }
    return null;
  }

  onSubmit(){
    if(this.validacionAlternativa){
      let direccion = this.cargarDireccion("Alternativa");
      if(direccion){
        localStorage.setItem("direccionPedido",JSON.stringify(direccion));
        this.router.irAPagarPedido();
      }
      else{
        alert("Error: Faltan datos de la direccion alternativa");
      }
    }
    else{
      let direccion = this.cargarDireccion("Usuario");
      if(direccion){
        localStorage.setItem("direccionPedido",JSON.stringify(direccion));
        this.router.irAPagarPedido();
      }
      else{
        alert("Error: Faltan datos de la direccion usuario");
      }
    }
  }
}
