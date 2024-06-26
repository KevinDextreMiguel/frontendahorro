
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { AdministrarComponent } from '../../../views/administrar/administrar.component';



@Component({
  selector: 'app-registrarcliente',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterLink, FormsModule,
    AdministrarComponent
  ],
  templateUrl: './registrarcliente.component.html',
  styleUrl: './registrarcliente.component.css'
})
  
  
export class RegistrarclienteComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  cliente: Cliente = new Cliente();


  edicion: boolean = false;
  id: number = 0;

  constructor(
    private cS: ClienteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idCliente: [''],
      nombreCliente: ['', Validators.required],
      dniCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      limiteCredito: [
        '',
        [
          Validators.required,
          Validators.min(200),
          Validators.max(10000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cliente.idCliente = this.form.value.idCliente;
      this.cliente.nombreCliente = this.form.value.nombreCliente;
      this.cliente.dniCliente = this.form.value.dniCliente;
      this.cliente.direccionCliente = this.form.value.direccionCliente;
      this.cliente.limiteCredito = this.form.value.limiteCredito;
      this.cS.insert(this.cliente).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['listarcliente']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCliente: new FormControl(data.idCliente),
          nombreCliente: new FormControl(data.nombreCliente),
          dniCliente: new FormControl(data.dniCliente),
          direccionCliente: new FormControl(data.direccionCliente),
          limiteCredito: new FormControl(data.limiteCredito),
        });
      });
    }
  }
}
