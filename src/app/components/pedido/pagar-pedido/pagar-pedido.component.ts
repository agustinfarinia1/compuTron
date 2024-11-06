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
import { ProductosService } from '../../../services/productos.service';

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

  constructor(private metodosDePagoService : MetodosDePagoService,private router : RouterService,private carritoService : CarritoService,private pedidoService : PedidoService,private productoService : ProductosService){
    this.usuario = {};
    this.pedido = null;
    this.carrito = null;
    this.pagarPedidoForm = new FormGroup({
      metodoDePago : new FormControl("",[Validators.required])
    })
    this.metodosDePago = [];
    let respuestaUsuario = localStorage.getItem("usuario");
    let respuestaJsonPedido = localStorage.getItem("pedido");
    if(respuestaUsuario && respuestaJsonPedido){
      this.usuario = JSON.parse(respuestaUsuario);
      let respuestaPedido  = JSON.parse(respuestaJsonPedido);
      if(respuestaPedido){
        let respuestaDireccion = new Direccion(respuestaPedido.direccionEnvio.calle,respuestaPedido.direccionEnvio.numero,respuestaPedido.direccionEnvio.piso,respuestaPedido.direccionEnvio.departamento);
        this.pedido = new Pedido("PE1",this.usuario.id,new Date(),respuestaPedido.precioFinal,"",respuestaDireccion);
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
        carrito.getCarrito().forEach(async(itemCarrito) => {
          console.log("edita");
          let producto = await this.productoService.consultarCodigo(itemCarrito.getId());
          producto = producto[0];
          let productoCarrito = carrito.getCarrito().find((busquedaProducto) => busquedaProducto.getId() === producto.getId());
          if(productoCarrito){
            producto.setCantidad(producto.getCantidad() - productoCarrito.getCantidad());
            this.productoService.editarProducto(producto);
            console.log("edita efectivamente");
          }
        });
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
        //this.router.irAHome();
      }
    }
  }
}
