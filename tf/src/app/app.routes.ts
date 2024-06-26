import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { IniciosesionComponent } from './views/iniciosesion/iniciosesion.component';
import { ListarclienteComponent } from './components/cliente/listarcliente/listarcliente.component';
import { RegistrarclienteComponent } from './components/cliente/registrarcliente/registrarcliente.component';
import { AdministrarComponent } from './views/administrar/administrar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ListarprestamoComponent } from './components/prestamo/listarprestamo/listarprestamo.component';
import { CrearprestamoComponent } from './components/prestamo/crearprestamo/crearprestamo.component';
import { ListarcuentaComponent } from './components/cuenta/listarcuenta/listarcuenta.component';
import { CrearcuentaComponent } from './components/cuenta/crearcuenta/crearcuenta.component';
import { BienvenidaComponent } from './views/bienvenida/bienvenida.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'iniciosesion', component: IniciosesionComponent },
    { path: 'administrar', component: AdministrarComponent },
    { path: 'bienvenida', component: BienvenidaComponent },


    { path: 'cliente', component: ClienteComponent },

    { path: 'listarcliente', component: ListarclienteComponent },
    { path: 'registrarcliente', component: RegistrarclienteComponent },
    { path: 'editarcliente/:id', component: RegistrarclienteComponent },

    { path: 'listarprestamo', component: ListarprestamoComponent },
    { path: 'registrarprestamo', component: CrearprestamoComponent },
    { path: 'editarprestamo/:id', component: CrearprestamoComponent },

    { path: 'listarcuenta', component: ListarcuentaComponent },
    { path: 'registrarcuenta', component: CrearcuentaComponent },
];
