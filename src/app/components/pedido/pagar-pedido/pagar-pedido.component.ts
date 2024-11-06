import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../services/router.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetodoDePago } from '../../../models/metodoDePago.model';
import { Pedido } from '../../../models/pedido.model';
import { Carrito } from '../../../models/carrito.model';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoLista } from '../../../models/productoLista.model';
import { MetodosDePagoService } from '../../../services/metodosDePago.service';

@Component({
  selector: 'app-pagar-pedido',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './pagar-pedido.component.html',
  styleUrl: './pagar-pedido.component.css'
})
export class PagarPedidoComponent implements OnInit{

  usuario;
  respuestaPedido;
  pagarPedidoForm : FormGroup;
  metodosDePago : MetodoDePago[];
  carrito : Carrito | null;

  constructor(private metodosDePagoService : MetodosDePagoService,private router : RouterService,private carritoService : CarritoService){
    this.usuario = {};
    this.respuestaPedido = {
      precioFinal : 0
    };
    this.carrito = null;
    this.pagarPedidoForm = new FormGroup({
      metodoDePago : new FormControl("",[Validators.required])
    })
    this.metodosDePago = [];
    let respuestaUsuario = localStorage.getItem("usuario");
    if(respuestaUsuario){
      this.usuario = JSON.parse(respuestaUsuario);
      let respuestaJsonPedido = localStorage.getItem("pedido");
      if(respuestaJsonPedido){
        this.respuestaPedido = JSON.parse(respuestaJsonPedido);
      }
      else{
        this.router.irAHome();
      }
    }
    else{
      this.router.irALogin();
    }
  }

  ngOnInit(): void {
    this.obtenerCarrito();
    this.metodosDePagoService.getMetodosDePago().then((respuestaMetodosDePago) => this.metodosDePago = respuestaMetodosDePago);
  }

  cargarPedido(){
    if(this.carrito){
      let metodoDePago = this.pagarPedidoForm.get("metodoDePago")?.value;
      if(metodoDePago){
        metodoDePago = this.metodosDePago[metodoDePago];
        let fecha = new Date();
        let pedido = new Pedido("PE1",this.usuario.id,fecha,this.respuestaPedido.precioFinal,metodoDePago.id);
        this.carrito.getCarrito().forEach((itemCarrito) => {
          let itemLista = new ProductoLista(itemCarrito.getId(),itemCarrito.getCantidad())
          pedido.getListaPedido().push(itemLista);
        })
        //console.log(this.respuestaPedido);
        //console.log(pedido);
        // Falta agregar el modelo direccion dentro del pedido para poder saber donde enviarlo
      }
    }
  }
  
  async obtenerCarrito() {
    try {
      if(this.usuario){
        this.carrito = await this.carritoService.getCarritoServer(this.usuario.id);
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  }
}
