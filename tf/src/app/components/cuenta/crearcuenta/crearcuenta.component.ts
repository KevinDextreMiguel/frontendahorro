import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Cuenta } from '../../../models/cuenta';
import { Cliente } from '../../../models/cliente';
import { CuentaService } from '../../../services/cuenta.service';
import { ClienteService } from '../../../services/cliente.service';


@Component({
  selector: 'app-crearcuenta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule, NgIf, RouterLink, MatSelectModule,
    MatIconModule
  ],
  templateUrl: './crearcuenta.component.html',
  styleUrl: './crearcuenta.component.css'
})
export class CrearcuentaComponent {
  form: FormGroup = new FormGroup({});
  cuenta: Cuenta = new Cuenta();
  listaCliente: Cliente[] = [];


  constructor(
    private suS: CuentaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private shS: ClienteService
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required],
      c3: ['', Validators.required],

    });
    this.shS.list().subscribe((data) => {
      this.listaCliente = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cuenta.Cliente.idCliente= this.form.value.c1;
      this.cuenta.saldoActual = this.form.value.c2;
      this.cuenta.numeroCuenta = this.form.value.c3;

      this.suS.insert(this.cuenta).subscribe((data) => {
        this.suS.list().subscribe((data) => {
          this.suS.setList(data);
        });
      });
      //this.router.navigate(['insumos']);
    }
  }
}
