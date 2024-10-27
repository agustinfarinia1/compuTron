import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  router = inject(Router);

  irAHome () {
    this.router.navigateByUrl("/inicio");
  }

  irALogin () {
    this.router.navigateByUrl("/");
  }

  irAEditarProducto (id : string) {
    this.router.navigateByUrl(`admin-productos/editar/${id}`);
  }

  irAEliminarProducto (id : string) {
    this.router.navigateByUrl(`admin-productos/eliminar/${id}`);
  }
}