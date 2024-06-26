import { Injectable } from '@angular/core';
import { environment } from '../../environmonts/environment';
import { Subject } from 'rxjs';
import { Transaccion } from '../models/Transaccion';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
  
  
export class TransaccionService {
  private url = `${base_url}/transacciones`;
  private listaCambio = new Subject<Transaccion[]>();
  constructor(private httpClient: HttpClient) { }


  list() {
    return this.httpClient.get<Transaccion[]>(this.url);
  }
  insert(p: Transaccion) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Transaccion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Transaccion>(`${this.url}/${id}`);
  }
  update(c: Transaccion) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
