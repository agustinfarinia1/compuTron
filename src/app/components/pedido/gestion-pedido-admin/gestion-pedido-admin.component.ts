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
import { ProductoLista } from '../../../models/productoLista.model';
import { ProductoListaPedidoComponent } from '../producto-lista-pedido/producto-lista-pedido.component';

@Component({
  selector: 'app-gestion-pedido-admin',
  standalone: true,
  imports: [CommonModule,ProductoListaPedidoComponent],
  templateUrl: './gestion-pedido-admin.component.html',
  styleUrl: './gestion-pedido-admin.component.css'
})
export class GestionPedidoAdminComponent implements OnInit {
  pedidos: Pedido[] | null;
  pedidosFiltrados: Pedido[] | null; // Lista de pedidos filtrados
  metodoDePagos: MetodoDePago[] | null;
  estadoPedidos: EstadoPedido[] | null;
  productos: Producto[] | null;
  filtrosActivos: string[] = []; // Estados seleccionados para el filtro

  constructor(
    private PedidoService: PedidoService,
    private estadoPedidoService: EstadoPedidoService,
    private productoService: ProductosService,
    private metodoDePagoService: MetodosDePagoService,
    private correoService: EmailService,
    private usuarioService: UsuarioService
  ) {
    this.pedidos = null;
    this.pedidosFiltrados = null;
    this.metodoDePagos = null;
    this.estadoPedidos = null;
    this.productos = null;
  }

  ngOnInit(): void {
    this.PedidoService.getPedidos().then((respuestaPedidos) => {
      this.pedidos = respuestaPedidos || [];
      this.pedidosFiltrados = this.pedidos ? [...this.pedidos] : []; // Inicialmente mostrar todos los pedidos
    });
    this.metodoDePagoService.getMetodosDePago().then((respuestaMetodoDePago) => (this.metodoDePagos = respuestaMetodoDePago));
    this.estadoPedidoService.getEstadoPedido().then((respuestaEstadoPedido) => (this.estadoPedidos = respuestaEstadoPedido));
    this.productoService.getProductos().then((respuestaProducto) => (this.productos = respuestaProducto));
  }

  filtrarPedidos(estado: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
  
    if (checkbox.checked) {
      this.filtrosActivos.push(estado); // Agregar estado al filtro
    } else {
      this.filtrosActivos = this.filtrosActivos.filter((e) => e !== estado); // Quitar estado del filtro
    }
  
    if (this.filtrosActivos.length > 0) {
      this.pedidosFiltrados = this.pedidos
        ? this.pedidos.filter((pedido) => this.filtrosActivos.includes(pedido.getIdEstadoPedido()))
        : [];
    } else {
      this.pedidosFiltrados = this.pedidos ? [...this.pedidos] : []; // Sin filtros, mostrar todos
    }
  }

  avanzarEstadoPedido(pedido: Pedido): void {
    if (this.estadoPedidos) {
      let index = this.estadoPedidos.findIndex((estado) => estado.getId() === pedido.getIdEstadoPedido());
      pedido.setIdEstadoPedido(this.estadoPedidos[index + 1].getId());
      
      let usuario = this.usuarioService.obtenerUsuarioPorId(pedido.getIdUsuario());
      usuario.subscribe((usuario) => {
        // Obtiene la informacion del usuario que tiene asignado el pedido para realizar el aviso por email
        if (usuario && usuario.email) {
          // Una vez que se realiza la confirmacion, se actualiza el stock actual de la tienda  
          if (pedido.getIdEstadoPedido() === '2') { 
            let verificacion = this.verificacionStockProductos(pedido.getListaPedido());
            if(verificacion){
              this.actualizarStockProductos(pedido.getListaPedido());
              pedido.setIdEstadoPedido("2");
              //this.correoService.enviarConfirmacionPedido(usuario.email, pedido.getId());
            }
            else{
              pedido.setIdEstadoPedido("1");
              alert("ERROR: stock invalido para esta operacion");
            }
          }
          if (pedido.getIdEstadoPedido() === '3') {
            //this.correoService.enviarEnvioPedido(usuario.email, pedido.getId());
            pedido.setIdEstadoPedido("3");
          }
          if (pedido.getIdEstadoPedido() === '4') {
           // this.correoService.enviarFinPedido(usuario.email, pedido.getId());
            pedido.setIdEstadoPedido("4");
          }
          // Actualiza el estado del pedido
          this.PedidoService.editarPedido(pedido);
        } else {
          console.error("Usuario o correo no disponible");
        }
      })
    }
  }

  verificacionStockProductos(listaPedido : ProductoLista[]){
    let verificacion = true;
    listaPedido.forEach((itemProducto : any) => {
      // Filtra los productos que estan dentro del pedido
      const productoPedido = this.productos?.find((busquedaProducto : Producto) => busquedaProducto.getId() == itemProducto.id);
      // Verifica que el stock restante no sea invalido
      if(productoPedido){
        if((productoPedido.getCantidad() - itemProducto.cantidad) < 0){
          verificacion = false;
        }
      }
      // Si no esta dentro del arreglo de producto disponibles, el producto fue eliminado o no tiene stock
      else{
        verificacion = false;
      }
    })
    return verificacion;
  }

  actualizarStockProductos(listaPedido : ProductoLista[]){
    listaPedido.forEach((itemProducto : any) => {
      // Filtra los productos que estan dentro del pedido
      let productoPedido = this.productos?.find((busquedaProducto) => busquedaProducto.getId() === itemProducto.id);
      // Actualiza el stock total del pedido y realiza la edicion en JsonServer
      if(productoPedido){
        productoPedido.setCantidad(productoPedido.getCantidad() - itemProducto.cantidad);
        this.productoService.editarProducto(productoPedido);
      }
    })
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
