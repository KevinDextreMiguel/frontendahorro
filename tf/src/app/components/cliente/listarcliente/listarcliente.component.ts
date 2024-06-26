import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { RegistrarclienteComponent } from '../registrarcliente/registrarcliente.component';
import { AdministrarComponent } from '../../../views/administrar/administrar.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaelicliComponent } from './confirmaelicli/confirmaelicli.component';

@Component({
  selector: 'app-listarcliente',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule, RegistrarclienteComponent,
    AdministrarComponent
  ],
  templateUrl: './listarcliente.component.html',
  styleUrl: './listarcliente.component.css'
})
  
  
export class ListarclienteComponent implements OnInit{
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource();
  displayedColumns: string[] = [
    'nombreCliente',
    'dniCliente',
    'direccionCliente',
    'limiteCredito',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cS: ClienteService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  
      
    eliminar(id: number) {
      this.dialog.open(ConfirmaelicliComponent, { width: '250px' }).afterClosed().subscribe((res) => {
        if (res) {
          this.cS.eliminar(id).subscribe((data) => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
          })
        }
      });
    }
}
