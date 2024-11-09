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
import { Direccion } from '../../../models/direccion.model';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pagar-pedido',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './pagar-pedido.component.html',
  styleUrl: './pagar-pedido.component.css'
})
export class PagarPedidoComponent implements OnInit{

  usuario;
  pedido : Pedido | null;
  pagarPedidoForm : FormGroup;
  metodosDePago : MetodoDePago[];
  carrito : Carrito | null;
  direccion : Direccion | null;

  constructor(private metodosDePagoService : MetodosDePagoService,private router : RouterService,private carritoService : CarritoService,private pedidoService : PedidoService){
    this.usuario = {};
    this.pedido = null;
    this.carrito = null;
    this.direccion = null;
    this.pagarPedidoForm = new FormGroup({
      metodoDePago : new FormControl("",[Validators.required])
    })
    this.metodosDePago = [];
    let respuestaUsuario = localStorage.getItem("usuario");
    let respuestaJsonDireccion = localStorage.getItem("direccionPedido");
    let respuestaJsonPrecio = localStorage.getItem("precioPedido");
    if(respuestaUsuario && respuestaJsonDireccion && respuestaJsonPrecio){
      this.usuario = JSON.parse(respuestaUsuario);
      let respuestaDireccion  = JSON.parse(respuestaJsonDireccion);
      let respuestaPrecio  = JSON.parse(respuestaJsonPrecio);
      if(respuestaDireccion && respuestaPrecio){
        this.pedido = new Pedido("",this.usuario.id,new Date(),respuestaPrecio,"",new Direccion(respuestaDireccion.calle,respuestaDireccion.numero,respuestaDireccion.piso,respuestaDireccion.departamento),"1");
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
    this.pedidoService.getCantidadPedidos().then((respuestaCantidad) =>  {
        if(this.pedido){
          this.pedido.setId(`${respuestaCantidad}`);
        }
    });
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

  async actualizarEstados(){
    if(this.pedido){
      let carrito = await this.carritoService.getCarritoServer(this.usuario.id);
      if(carrito){
        carrito.vaciarCarrito();
        localStorage.setItem("cantidadCarrito","0");
        localStorage.removeItem("totalCarrito");
        localStorage.removeItem("pedido");
        this.pedidoService.setNewPedido(this.pedido);
        this.carritoService.setCarritoServer(this.usuario.id,carrito);
      } 
    }
  }

  async cargarPedido(){
    if(this.carrito && this.pedido){
      let metodoDePago = this.pagarPedidoForm.get("metodoDePago")?.value;
      if(metodoDePago){
        metodoDePago = this.metodosDePago[metodoDePago];
        this.carrito.getCarrito().forEach((itemCarrito) => {
          let itemLista = new ProductoLista(itemCarrito.getId(),itemCarrito.getCantidad());
          this.pedido?.getListaPedido().push(itemLista);
        })
        this.pedido.setIdMetodoDePago(metodoDePago.id);
        this.actualizarEstados();
        alert("pedido creado exitosamente");
        this.router.irAHome();
      }
    }
  }
}
