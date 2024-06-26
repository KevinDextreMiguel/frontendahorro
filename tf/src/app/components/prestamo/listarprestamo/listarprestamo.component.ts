
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Prestamo } from '../../../models/prestamo';
import { PrestamoService } from '../../../services/prestamo.service';
import { AdministrarComponent } from '../../../views/administrar/administrar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import autoTable from 'jspdf-autoTable';
import {jsPDF} from "jspdf"
import { MatIconModule } from '@angular/material/icon';
import { ConfirmapagoComponent } from './confirmapago/confirmapago.component';
import { MatDialog } from '@angular/material/dialog';
//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-listarprestamo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,

    MatTableModule,

    AdministrarComponent, MatIconModule
  ],
  templateUrl: './listarprestamo.component.html',
  styleUrl: './listarprestamo.component.css'
})
export class ListarprestamoComponent implements OnInit{
  presta:Prestamo=new Prestamo()
  form: FormGroup = new FormGroup({});
  listaPrestamos:Prestamo[]=[]
  nuevaLista: Prestamo[] = []
  cols: any[] = [];
  dataSource: MatTableDataSource<Prestamo> = new MatTableDataSource();
  displayedColumns: string[] =
    ['c2', 'c3',
      'c4', 'c5', 'c6',
      'c7',  'c9', 'c10', 'c11', 'c12','c13',
      'c14'//, 'eliminar'
    ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

 // @ViewChild('content') content: ElementRef;
  constructor(private sS: PrestamoService, private formBuilder: FormBuilder, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dni: ['', Validators.required],
    });


    this.sS.list().subscribe((data) => {
      this.listaPrestamos = data;
      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    });
  }

  filtrar() {
    this.nuevaLista = []
    this.dataSource = new MatTableDataSource();
    for (let index = 0; index < this.listaPrestamos.length; index++) {
      if (this.listaPrestamos[index].cliente.dniCliente == this.form.value.dni)
      {        
        this.nuevaLista.push(this.listaPrestamos[index])
        //this.nuevaLista[index].saldo = parseFloat(this.nuevaLista[index].saldo.toFixed(2))
        //this.nuevaLista[index].monto_final = parseFloat(this.nuevaLista[index].monto_final.toFixed(2));
      }
    }

    for (let index = 0; index < this.nuevaLista.length; index++) {
      for (let index1 = index; index1 < this.nuevaLista.length; index1++) {
        if (this.nuevaLista[index].saldo < this.nuevaLista[index1].saldo) {
          this.presta = this.nuevaLista[index];
          this.nuevaLista[index] = this.nuevaLista[index1];
          this.nuevaLista[index1] = this.presta;
        }
      }  
    }

    this.dataSource = new MatTableDataSource(this.nuevaLista);
  }

  eliminar(id: number) {
    this.sS.eliminar(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
          });
        })
  }

  exportPdf() {
    const doc = new jsPDF('landscape');
    const columns = this.cols.map(col => col.header);
    const rows = this.nuevaLista.map(item =>
      [item.cliente.dniCliente, item.montoPrestamo,item.diaPagoMensual, item.tipoCredito, item.tasa,
        item.tipoTasa,item.fecha_vencimiento.toString(),item.monto_final,item.estadoPrestamo,
      ]
    );
    autoTable(doc, {
      head: [['DNI cliente', 'Monto Prèstamo', 'Dìa de Pago', 'Tipo Crèdito', 'tasa',
        'tipo tasa', 'fecha vencimiento', 'monto final', 'estado']],
      body: rows
    });

    doc.autoPrint();
    doc.output('dataurlnewwindow');
  }



  pagado(s: string) {
    return s=="pendiente"
  }
  ispagado(s: string) {
    return s == "pagado"
  }

  ispagofuturo(s:string) {
    return s == "Pago futuro"
  }
  iscuota(s: string) {
    return s == "Cuota"
  }

  pagar(p: Prestamo) {
    this.dialog.open(ConfirmapagoComponent, { width: '250px' }).afterClosed().subscribe((res) => {
      if (res) {
    p.estadoPrestamo = "pagado"
    this.sS.insert(p).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
      }
    });
    this.filtrar();
  }
}
