import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { EstadoPedidoService } from '../../../services/estado-pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { EstadoPedido } from '../../../models/estadoPedido.model ';
import { CommonModule } from '@angular/common';
import { MetodoDePago } from '../../../models/metodoDePago.model';
import { MetodosDePagoService } from '../../../services/metodosDePago.service';
import { Producto } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { ProductoLista } from '../../../models/productoLista.model';

@Component({
  selector: 'app-gestion-pedido-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-pedido-admin.component.html',
  styleUrl: './gestion-pedido-admin.component.css'
})
export class GestionPedidoAdminComponent implements OnInit{

  pedidos : Pedido[] | null;
  metodoDePagos : MetodoDePago[] | null;
  estadoPedidos : EstadoPedido[] | null;
  productos : Producto[] | null;

  constructor(private PedidoService : PedidoService,private estadoPedidoService : EstadoPedidoService,private metodoDePagoService : MetodosDePagoService,private productoService : ProductosService){
    this.pedidos = null;
    this.metodoDePagos = null;
    this.estadoPedidos = null;
    this.productos = null;
  }

  ngOnInit(): void {
    this.PedidoService.getPedidos().then((respuestaPedidos) => this.pedidos = respuestaPedidos);
    this.metodoDePagoService.getMetodosDePago().then((respuestaMetodoDePago) => this.metodoDePagos = respuestaMetodoDePago);
    this.estadoPedidoService.getEstadoPedido().then((respuestaEstadoPedido) => this.estadoPedidos = respuestaEstadoPedido);
    this.productoService.getProductos().then((respuestaProducto) => this.productos = respuestaProducto);
  }

  avanzarEstadoPedido(pedido : Pedido){
    if(this.estadoPedidos){
      let index = this.estadoPedidos?.findIndex((busqueda) => busqueda.getId() === pedido.getIdEstadoPedido());
      if(pedido.getIdEstadoPedido() === "1"){
        pedido.getListaPedido().forEach((itemLista : any) => {
          if(this.productos){
            let producto = this.productos.find((busquedaProducto : Producto) => busquedaProducto.getId() === itemLista.id);
            if(producto){
              producto.setCantidad(producto.getCantidad() - itemLista.cantidad);
              this.productoService.editarProducto(producto);
            }
          }
        });
      }
      pedido.setIdEstadoPedido(this.estadoPedidos[index + 1].getId());
      this.PedidoService.editarPedido(pedido);
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
}
