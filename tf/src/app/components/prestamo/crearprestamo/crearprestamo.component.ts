import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, Router } from '@angular/router';
import { Prestamo } from '../../../models/prestamo';
import { Cliente } from '../../../models/cliente';
import { PrestamoService } from '../../../services/prestamo.service';
import moment from 'moment';
import { ClienteService } from '../../../services/cliente.service';
import { MatIconModule } from '@angular/material/icon';
import { AdministrarComponent } from '../../../views/administrar/administrar.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from './confirmar/confirmar.component';


@Component({
  selector: 'app-crearprestamo',
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
    MatIconModule,
   AdministrarComponent
  ],
  templateUrl: './crearprestamo.component.html',
  styleUrl: './crearprestamo.component.css'
})
  
export class CrearprestamoComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  prestamo: Prestamo = new Prestamo();
  listaCliente: Cliente[] = [];
  dias: number = 0
  fechaI:any=""
  fechaF: any = ""
  cont: number = 0
  aux:number=0
  maxFecha: Date = moment().add(-1, 'days').toDate();
  //
  valorFuturo:number=0

  tasas: { value: string; viewValue: string }[] = [
    { value: 'Nominal', viewValue: 'Nominal' },
    { value: 'Efectiva', viewValue: 'Efectiva' },
  ];

  tipoTransaccion: { value: string; viewValue: string }[] = [
    { value: 'Cuota', viewValue: 'Cuota' },
    { value: 'Pago futuro', viewValue: 'Pago futuro' },
  ];

  constructor(
    private suS: PrestamoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private shS: ClienteService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required],
      c3: [''],
      c4: ['', Validators.required],
      c5: ['', Validators.required],
      c6: ['', Validators.required],
      c7: [''],
      c8: [''],
      c9: [''],
      c10:[''],
      valorFuturo: [''],
    });
    this.shS.list().subscribe((data) => {
      this.listaCliente = data;
    });
  }

  esCuota() {
    return this.form.value.c4 == "Cuota";
  }

  esPagoFuturo() {
    return this.form.value.c4 == "Pago futuro";
  }

  calcular(){
    if (this.form.value.c4 == "Pago futuro") {
      if (this.prestamo.tipoTasa == "Efectiva") {
        this.prestamo.monto_final = this.prestamo.montoPrestamo * (1 + (this.prestamo.tasa / 100)) ** (this.dias / 360);
      }
      else {
        this.prestamo.monto_final = this.prestamo.montoPrestamo * (1 + (this.prestamo.tasa / 100) / 360) ** (this.dias);
      }
      this.valorFuturo = this.prestamo.monto_final;
    }
  }


  aceptar(): void {
    if (this.form.valid) {
      this.dialog.open(ConfirmarComponent, { width: '250px' }).afterClosed().subscribe((res) => {    
      if (res) {
      this.prestamo.cliente.idCliente = this.form.value.c1;
      this.prestamo.montoPrestamo = this.form.value.c2;
      this.prestamo.diaPagoMensual = this.form.value.c3;
      this.prestamo.tipoCredito = this.form.value.c4;
      this.prestamo.tasa = this.form.value.c5;
      this.prestamo.tipoTasa = this.form.value.c6;
      this.prestamo.tasaMoratoria = 0;
      this.prestamo.fecha_inicial = moment().add('days').toDate();
      this.prestamo.fecha_vencimiento = this.form.value.c7;
        this.prestamo.estadoPrestamo = "pendiente";
      

      this.fechaF = this.prestamo.fecha_vencimiento;
      this.fechaI = this.prestamo.fecha_inicial;


      this.dias = Math.abs(this.fechaF - this.fechaI)
      this.dias = this.dias / (1000 * 3600 * 24)

        if (this.form.value.c4 == "Pago futuro") {
          this.prestamo.tasa = this.prestamo.tasa / 100;
        if (this.prestamo.tipoTasa == "Efectiva") {
          this.prestamo.monto_final = this.prestamo.montoPrestamo * (1 + this.prestamo.tasa) ** (this.dias / 360);
        }
        else {
          this.prestamo.monto_final = this.prestamo.montoPrestamo * (1 + (this.prestamo.tasa/360)) ** (this.dias);
        }

        this.prestamo.interesPrestamo = this.prestamo.monto_final - this.prestamo.montoPrestamo;

        this.suS.insert(this.prestamo).subscribe((data) => {
          this.suS.list().subscribe((data) => {
            this.suS.setList(data);
          });
        });
      }

      //Cuando es a cuotas
      else {
        this.prestamo.cantidad_cuota = this.form.value.c8;
        this.prestamo.periodoGracia = this.form.value.c10;
        if (this.prestamo.periodoGracia == 0)
        {
        if (this.prestamo.tipoTasa == "Efectiva") {
          this.prestamo.tasa = ((1 + this.prestamo.tasa/100) ** (30 / 360)) - 1;
          this.prestamo.cuota = this.prestamo.montoPrestamo * ((this.prestamo.tasa) * (1 + (this.prestamo.tasa)) ** this.prestamo.cantidad_cuota) / (((1 + (this.prestamo.tasa)) ** this.prestamo.cantidad_cuota) - 1);          
        } 
        else {
          this.prestamo.tasa = ((1 + (this.prestamo.tasa / 100) / 12) ** 12) - 1;
          this.prestamo.tasa = ((1 + this.prestamo.tasa) ** (30 / 360)) - 1;
          this.prestamo.cuota = this.prestamo.montoPrestamo * ((this.prestamo.tasa) * (1 + (this.prestamo.tasa)) ** this.prestamo.cantidad_cuota) / (((1 + (this.prestamo.tasa)) ** this.prestamo.cantidad_cuota) - 1);
        }

        this.prestamo.monto_final = this.prestamo.cantidad_cuota * this.prestamo.cuota;

        this.prestamo.interesPrestamo = this.prestamo.monto_final - this.prestamo.montoPrestamo;
        this.prestamo.ineteres_cuota = this.prestamo.interesPrestamo / this.prestamo.cantidad_cuota;   

        var ppp = 1;
        //primer saldo
        for (let index = 0; index < this.prestamo.cantidad_cuota; index++) {
          this.cont = this.cont + 1
          this.aux = this.prestamo.cuota * this.cont;
          this.prestamo.saldo = this.prestamo.monto_final - this.aux;
          //falta calcular vencimiento
          const hoy = new Date();
          const enDiezDias = new Date(hoy.getTime() + (30*ppp * 24 * 60 * 60 * 1000));
          this.prestamo.fecha_vencimiento = enDiezDias;
          ppp += 1;


          this.suS.insert(this.prestamo).subscribe((data) => {
            this.suS.list().subscribe((data) => {
              this.suS.setList(data);
            });
          });      
          }
        }


        //cuando existe periodo de gracia
        else {
          var MontoCapitalizado = 0;
          if (this.prestamo.tipoTasa == "Efectiva") {
            MontoCapitalizado = this.prestamo.montoPrestamo * (1 + this.prestamo.tasa / 100) ** (this.prestamo.periodoGracia*30/360);
            this.prestamo.montoPrestamo = MontoCapitalizado;
            this.prestamo.tasa = ((1 + this.prestamo.tasa / 100) ** (30 / 360)) - 1;
            this.prestamo.cuota = this.prestamo.montoPrestamo * ((this.prestamo.tasa) * (1 + (this.prestamo.tasa)) ** (this.prestamo.cantidad_cuota - this.prestamo.periodoGracia)) / (((1 + (this.prestamo.tasa)) ** (this.prestamo.cantidad_cuota - this.prestamo.periodoGracia)) - 1);
          }
          else {
            MontoCapitalizado = this.prestamo.montoPrestamo * (1 + (this.prestamo.tasa / 100)/360) ** (this.prestamo.periodoGracia * 30);
            this.prestamo.montoPrestamo = MontoCapitalizado;
            this.prestamo.tasa = ((1 + (this.prestamo.tasa / 100) / 360) ** 360) - 1;
            this.prestamo.tasa = ((1 + this.prestamo.tasa) ** (30 / 360)) - 1;
            this.prestamo.cuota = this.prestamo.montoPrestamo * ((this.prestamo.tasa) * (1 + (this.prestamo.tasa)) ** (this.prestamo.cantidad_cuota - this.prestamo.periodoGracia)) / (((1 + (this.prestamo.tasa)) ** (this.prestamo.cantidad_cuota - this.prestamo.periodoGracia)) - 1);
          }

          this.prestamo.monto_final = (this.prestamo.cantidad_cuota - this.prestamo.periodoGracia) * this.prestamo.cuota;

          this.prestamo.interesPrestamo = this.prestamo.monto_final - this.prestamo.montoPrestamo;
          this.prestamo.ineteres_cuota = this.prestamo.interesPrestamo / (this.prestamo.cantidad_cuota - this.prestamo.periodoGracia);   
          
          var ppp = 1;
          for (let index = 0; index < this.prestamo.cantidad_cuota - this.prestamo.periodoGracia; index++) { 
            this.cont = this.cont + 1
            this.aux = this.prestamo.cuota * this.cont;
            this.prestamo.saldo = this.prestamo.monto_final - this.aux;

            //fecha
            const hoy = new Date();
            const enDiezDias = new Date(hoy.getTime() + (30 * ppp * 24 * 60 * 60 * 1000));
            this.prestamo.fecha_vencimiento = enDiezDias;
            ppp += 1;

            this.suS.insert(this.prestamo).subscribe((data) => {
              this.suS.list().subscribe((data) => {
                this.suS.setList(data);
              });
            });
          }
        }
        }
        this.router.navigate(['listarprestamo']);
      }
      });   
  }
}
}
