import { Injectable } from '@angular/core';
import { environment } from '../../environmonts/environment';
import { Subject } from 'rxjs';
import { Prestamo } from '../models/prestamo';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
  
  
export class PrestamoService {
  private url = `${base_url}/prestamos`;
  private listaCambio = new Subject<Prestamo[]>();
  constructor(private httpClient: HttpClient) { }


  list() {
    return this.httpClient.get<Prestamo[]>(this.url);
  }
  insert(p: Prestamo) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Prestamo[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Prestamo>(`${this.url}/${id}`);
  }
  update(c: Prestamo) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
