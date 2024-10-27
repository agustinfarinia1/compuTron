import { Routes } from '@angular/router';
import { LogueoComponent } from './components/usuario/logueo/logueo.component';
import { RegistrarComponent } from './components/usuario/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { GestionProductoComponent } from './components/producto/gestion-producto/gestion-producto.component';
import { FormularioProductoComponent } from './components/producto/formulario-producto/formulario-producto.component';
import { ListaProductosComponent } from './components/producto/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { authGuard } from './guards/auth.guard';
import { EliminarProductoComponent } from './components/producto/eliminar-producto/eliminar-producto.component';

export const routes: Routes = [
  {path:"login",component:LogueoComponent},
  {path:"registrar",component:RegistrarComponent},
  {path:"inicio",component:HomeComponent,canActivate:[authGuard]},
  {path:"productos",component:ListaProductosComponent,canActivate:[authGuard]},
  {path:"productos/:id",component:DetalleProductoComponent,canActivate:[authGuard]},
  {path:"admin-productos",component:GestionProductoComponent,canActivate:[authGuard]},
  {path:"admin-productos/cargar",component:FormularioProductoComponent,canActivate:[authGuard]},
  {path:"admin-productos/editar/:id",component:FormularioProductoComponent,canActivate:[authGuard]},
  {path:"admin-productos/eliminar/:id",component:EliminarProductoComponent,canActivate:[authGuard]},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"**",component:HomeComponent}
];
