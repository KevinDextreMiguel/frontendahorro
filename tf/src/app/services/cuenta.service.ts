import { Injectable } from '@angular/core';
import { environment } from '../../environmonts/environment';
import { Subject } from 'rxjs';
import { Cuenta } from '../models/cuenta';
import { HttpClient } from '@angular/common/http';



const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
  
export class CuentaService {
  private url = `${base_url}/cuentas`;
  private listaCambio = new Subject<Cuenta[]>();
  constructor(private httpClient: HttpClient) { }


  list() {
    return this.httpClient.get<Cuenta[]>(this.url);
  }
  insert(p: Cuenta) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Cuenta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Cuenta>(`${this.url}/${id}`);
  }
  update(c: Cuenta) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
