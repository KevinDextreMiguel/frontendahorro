import { Component } from '@angular/core';
import { AdministrarComponent } from '../administrar/administrar.component';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [
    AdministrarComponent
  ],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {

}
