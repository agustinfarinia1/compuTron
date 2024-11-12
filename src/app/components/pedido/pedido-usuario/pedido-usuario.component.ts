import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { MetodoDePago } from '../../../models/metodoDePago.model';
import { EstadoPedido } from '../../../models/estadoPedido.model ';
import { Producto } from '../../../models/producto.model';
import { PedidoService } from '../../../services/pedido.service';
import { EstadoPedidoService } from '../../../services/estado-pedido.service';
import { MetodosDePagoService } from '../../../services/metodosDePago.service';
import { ProductoLista } from '../../../models/productoLista.model';
import { ProductoListaPedidoComponent } from "../producto-lista-pedido/producto-lista-pedido.component";

@Component({
  selector: 'app-pedido-usuario',
  standalone: true,
  imports: [CommonModule, ProductoListaPedidoComponent],
  templateUrl: './pedido-usuario.component.html',
  styleUrl: './pedido-usuario.component.css'
})
export class PedidoUsuarioComponent implements OnInit{
  pedidos : Pedido[] | null;
  metodoDePagos : MetodoDePago[] | null;
  estadoPedidos : EstadoPedido[] | null;
  productos : Producto[] | null;

  constructor(private PedidoService : PedidoService,private estadoPedidoService : EstadoPedidoService,private metodoDePagoService : MetodosDePagoService){
    this.pedidos = null;
    this.metodoDePagos = null;
    this.estadoPedidos = null;
    this.productos = null;
  }

  ngOnInit(): void {
    let respuestaUsuario = localStorage.getItem("usuario");
    if(respuestaUsuario){
      let usuario = JSON.parse(respuestaUsuario);
      this.PedidoService.getPedidosUsuario(usuario.id).then((respuestaPedidos) => this.pedidos = respuestaPedidos);
      this.metodoDePagoService.getMetodosDePago().then((respuestaMetodoDePago) => this.metodoDePagos = respuestaMetodoDePago);
      this.estadoPedidoService.getEstadoPedido().then((respuestaEstadoPedido) => this.estadoPedidos = respuestaEstadoPedido);
    }
  }

  getMetodoDePago(idMetodoDePago : string){
    if(this.metodoDePagos){
      return this.metodoDePagos.find((busquedaMetodoDePago) => busquedaMetodoDePago.getId() === idMetodoDePago);
    }
    return null;
  }

  getEstadoPedido(idEstadoPedido : string){
    if(this.estadoPedidos){
      return this.estadoPedidos.find((busquedaMetodoDePago) => busquedaMetodoDePago.getId() === idEstadoPedido);
    }
    return null;
  }

  getProductoLista(idProducto : string){
    let busquedaProducto = null;
    if(this.productos){
      busquedaProducto = this.productos.find((busquedaProducto) => busquedaProducto.getId() === idProducto);
    }
    return busquedaProducto;
  }

  getListaPedido(pedido : Pedido){
    let listaPedido  :ProductoLista[] = [];
    if(pedido){
      listaPedido = pedido.getListaPedido();
    }
    return listaPedido;
  }
}
