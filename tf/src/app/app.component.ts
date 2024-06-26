import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IniciosesionComponent } from './views/iniciosesion/iniciosesion.component';
import { HomeComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IniciosesionComponent,
    RouterLink,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tf';
}
