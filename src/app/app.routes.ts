import { Routes } from '@angular/router';
import { LogueoComponent } from './components/usuario/logueo/logueo.component';
import { RegistroComponent } from './components/usuario/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { GestionProductoComponent } from './components/producto/gestion-producto/gestion-producto.component';
import { FormularioProductoComponent } from './components/producto/formulario-producto/formulario-producto.component';
import { ListaProductosComponent } from './components/producto/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { authGuard } from './guards/auth.guard';
import { EliminarProductoComponent } from './components/producto/eliminar-producto/eliminar-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ConfirmarPedidoComponent } from './components/pedido/confirmar-pedido/confirmar-pedido.component';
import { PagarPedidoComponent } from './components/pedido/pagar-pedido/pagar-pedido.component';
import { NoAuthGuard } from './services/noauth.service';
import { GestionPedidoAdminComponent } from './components/pedido/gestion-pedido-admin/gestion-pedido-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { PedidoUsuarioComponent } from './components/pedido/pedido-usuario/pedido-usuario.component';
import { GestionPerfilComponent } from './components/usuario/gestion-perfil/gestion-perfil.component';

export const routes: Routes = [
  // Rutas públicas para login y registro
  { path: "login", component: LogueoComponent, canActivate: [NoAuthGuard] },
  { path: "registrar", component: RegistroComponent, canActivate: [NoAuthGuard] },
  
  // Rutas accesibles para todos los usuarios autenticados (usuarios y administradores)
  { path: "inicio", component: HomeComponent, canActivate: [authGuard] },
  { path: "productos", component: ListaProductosComponent, canActivate: [authGuard] },
  { path: "carrito", component: CarritoComponent, canActivate: [authGuard] },
  { path: "confirmar-pedido", component: ConfirmarPedidoComponent, canActivate: [authGuard] },
  { path: "pagar-pedido", component: PagarPedidoComponent, canActivate: [authGuard] },
  { path: "productos/:id", component: DetalleProductoComponent, canActivate: [authGuard] },
  { path: "ver-pedidos", component: PedidoUsuarioComponent, canActivate: [authGuard] },
  { path: "perfil", component: GestionPerfilComponent, canActivate: [authGuard] },
  
  // Rutas exclusivas para administradores
  { path: "admin-productos", component: GestionProductoComponent, canActivate: [authGuard, AdminGuard] },
  { path: "admin-productos/cargar", component: FormularioProductoComponent, canActivate: [authGuard, AdminGuard] },
  { path: "admin-productos/editar/:id", component: FormularioProductoComponent, canActivate: [authGuard, AdminGuard] },
  { path: "admin-productos/eliminar/:id", component: EliminarProductoComponent, canActivate: [authGuard, AdminGuard] },
  { path: "admin-pedidos", component: GestionPedidoAdminComponent, canActivate: [authGuard, AdminGuard] },
  
  // Redirección y rutas no encontradas
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", component: HomeComponent }
];
