import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Keys de EmailJS
  private serviceID = 'service_gdo1qng';
  private templateID = 'template_cmrch8s';
  private userID = 'G9kIoumErpWJWTI-w';

  constructor() {}

  // envia un email con emailJS
  sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }

  // envia confirmacion de pedido
  enviarConfirmacionPedido(emailUsuario: string, numeroPedido: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      email_usuario: emailUsuario,
      numero_pedido: numeroPedido,
      mensaje: `Tu orden #${numeroPedido} ha sido confirmada. Gracias por tu compra.`,
    };
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }

  // envia aviso de pedido al cliente
  enviarEnvioPedido(emailUsuario: string, numeroPedido: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      email_usuario: emailUsuario,
      numero_pedido: numeroPedido,
      mensaje: `Tu orden #${numeroPedido} esta en camino. Gracias por tu compra.`,
    };
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }

  // envia aviso de finalizacion de compra al cliente
  enviarFinPedido(emailUsuario: string, numeroPedido: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      email_usuario: emailUsuario,
      numero_pedido: numeroPedido,
      mensaje: `Tu orden #${numeroPedido} finalizo con exito. Gracias por tu compra.`,
    };
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }
}