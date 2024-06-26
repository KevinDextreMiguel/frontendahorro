import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { RegistrarclienteComponent } from './registrarcliente/registrarcliente.component';
import { ListarclienteComponent } from './listarcliente/listarcliente.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../views/header/header.component';
import { FooterComponent } from '../../views/footer/footer.component';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    RouterOutlet,
    RegistrarclienteComponent,
    ListarclienteComponent,
    MatButtonModule,
    MatIconModule, RouterLink,
    HeaderComponent, FooterComponent,
    
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
  
  
export class ClienteComponent implements OnInit{
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void { }
}
