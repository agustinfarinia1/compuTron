import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent implements OnInit{

  @Input() mostrarMensaje : boolean;
  @Input() mensajeTexto : string;
  @Input() redireccionMensaje : string;

  constructor(private routerService : RouterService){
    this.mostrarMensaje = false;
    this.mensajeTexto = "";
    this.redireccionMensaje = "";
  }

  ngOnInit(): void {
  }

  cerrarMensaje(){
    this.mostrarMensaje = false;
    if(this.redireccionMensaje === "home"){
      this.routerService.irAHome();
    }
  }
}
