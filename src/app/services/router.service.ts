import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  router = inject(Router);

  // Se utiliza para realizar las redirecciones con este servicio.

  irAHome () {
    this.router.navigateByUrl("/inicio");
  }

  irALogin () {
    this.router.navigateByUrl("/login");
  }

  irAGestionProducto () {
    this.router.navigateByUrl(`admin-productos`);
  }

  irAEditarProducto (id : string) {
    this.router.navigateByUrl(`admin-productos/editar/${id}`);
  }

  irAEliminarProducto (id : string) {
    this.router.navigateByUrl(`admin-productos/eliminar/${id}`);
  }

  irAProductos () {
    this.router.navigateByUrl(`productos`);
  }

  irAConfirmarPedido(){
    this.router.navigateByUrl("confirmar-pedido");
  }

  irAPagarPedido(){
    this.router.navigateByUrl("pagar-pedido");
  }
  irAPerfil(){
    this.router.navigateByUrl("perfil");
  }
  
}
