import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { Cliente } from '../../models/cliente';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css'
})
  
export class AdministrarComponent{
  cliente:Cliente=new Cliente()
  //ini?:IniciosesionComponent
 // private ini: IniciosesionComponent = new IniciosesionComponent()
  constructor(
   // private ini:IniciosesionComponent
  ) { }
 
  mostrar(): void
  {
    //this.cliente = this.ini.get_cliente()
  }
}
