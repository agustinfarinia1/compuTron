import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Keys de EmailJS
  private serviceID = 'service_2pbluc2';
  private templateID = 'template_y8rr51p';
  private userID = 'mUHz1rV4pPCDOWm0F';

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