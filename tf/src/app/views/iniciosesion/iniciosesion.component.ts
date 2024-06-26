import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, CommonModule, RouterLink, FormsModule,
    ReactiveFormsModule,
    HeaderComponent, FooterComponent
  ],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})

  
  
export class IniciosesionComponent implements OnInit{

  userName:string=""
  password: string = ""
  listaCliente: Cliente[] = []
  clien = new Cliente()
  encontrar:boolean=false


  constructor(
   private router: Router,
   private clienteService: ClienteService,
   //private clien: Cliente
  ) { }

  ngOnInit(): void {
    this.clienteService.list().subscribe(datos => {
      this.listaCliente = datos;
    })//ponerlo antes
  }


  login(){
    /*this.clien = this.listaCliente.find(x => x.dniCliente == this.userName && x.contraseniaCliente == this.password);
    for (let index = 0; index < this.listaCliente.length; index++) {
      if ((this.listaCliente[index].contraseniaCliente == this.password) && (this.listaCliente[index].dniCliente == this.userName))
      {
        this.clien = this.listaCliente[index];
        this.encontrar=true
      }     
    }*/
    if (this.password=="1234" && this.userName=="admin") {
      this.router.navigate(['bienvenida']);
    }
    else {
      alert("Datos proporcionados incorrectos.");
    }
  }
  get_cliente(): Cliente { return this.clien }
}





