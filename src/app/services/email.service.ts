import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceID = 'service_gdo1qng';
  private templateID = 'template_cmrch8s';
  private userID = 'G9kIoumErpWJWTI-w';

  constructor() {}

  sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }

  enviarConfirmacionPedido(emailUsuario: string, numeroPedido: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      email_usuario: emailUsuario,
      numero_pedido: numeroPedido,
      mensaje: `Tu orden #${numeroPedido} ha sido confirmada. Gracias por tu compra.`,
    };
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }
}