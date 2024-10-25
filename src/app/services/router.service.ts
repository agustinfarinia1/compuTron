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
}
