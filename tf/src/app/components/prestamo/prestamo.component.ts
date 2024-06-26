import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-prestamo',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent implements OnInit{
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {
      
  }
}
