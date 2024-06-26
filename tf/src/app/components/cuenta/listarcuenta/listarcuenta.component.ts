import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Cuenta } from '../../../models/cuenta';
import { CuentaService } from '../../../services/cuenta.service';
import { MatDialog } from '@angular/material/dialog';
import { AdministrarComponent } from '../../../views/administrar/administrar.component';

@Component({
  selector: 'app-listarcuenta',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    AdministrarComponent
  ],
  templateUrl: './listarcuenta.component.html',
  styleUrl: './listarcuenta.component.css'
})
export class ListarcuentaComponent {
  displayedColumns: string[] =
    ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Cuenta> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private vS: CuentaService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }
}

