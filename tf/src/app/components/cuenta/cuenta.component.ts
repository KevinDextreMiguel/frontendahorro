import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit{
    constructor(public route: ActivatedRoute) { }
 ngOnInit(): void {

    }
}
