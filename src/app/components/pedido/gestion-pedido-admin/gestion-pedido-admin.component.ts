import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { EstadoPedidoService } from '../../../services/estado-pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { EstadoPedido } from '../../../models/estadoPedido.model ';
import { CommonModule } from '@angular/common';
import { MetodoDePago } from '../../../models/metodoDePago.model';
import { MetodosDePagoService } from '../../../services/metodosDePago.service';
import { EmailService } from '../../../services/email.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Producto } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos.service';

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
 
  constructor(private PedidoService : PedidoService,private estadoPedidoService : EstadoPedidoService,
    private productoService : ProductosService,
    private metodoDePagoService : MetodosDePagoService, 
    private correoService: EmailService,
    private usuarioService: UsuarioService
  ){
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

  avanzarEstadoPedido(pedido: Pedido): void {
    if (this.estadoPedidos) {
      let index = this.estadoPedidos.findIndex((estado) => estado.getId() === pedido.getIdEstadoPedido());
      pedido.setIdEstadoPedido(this.estadoPedidos[index + 1].getId());
      
      this.PedidoService.editarPedido(pedido).then(() => {
          this.usuarioService.obtenerUsuarioPorId(pedido.getIdUsuario()).subscribe((usuario) => {
            if (usuario && usuario.email) {  // Verifica que 'usuario' y 'usuario.email' no sean undefined
              if (pedido.getIdEstadoPedido() === '2') {
              this.correoService.enviarConfirmacionPedido(usuario.email, pedido.getId());
              }
              if (pedido.getIdEstadoPedido() === '3') {
                this.correoService.enviarEnvioPedido(usuario.email, pedido.getId());
                }
              if (pedido.getIdEstadoPedido() === '4') {
                this.correoService.enviarFinPedido(usuario.email, pedido.getId());
              }
            } else {
              console.error("Usuario o correo no disponible");
            }
          });
      });
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
