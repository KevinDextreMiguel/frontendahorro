import { Injectable } from '@angular/core';
import { environment } from '../../environmonts/environment';
import { Subject } from 'rxjs';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';



const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
  
export class ClienteService {
  private url = `${base_url}/clientes`;
  private listaCambio = new Subject<Cliente[]>();
  constructor(private httpClient: HttpClient) { }
  
  list() {
    return this.httpClient.get<Cliente[]>(this.url);
  }
  insert(c: Cliente) {
    return this.httpClient.post(this.url, c);
  }
  setList(listaNueva: Cliente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Cliente>(`${this.url}/${id}`);
  }
  update(c: Cliente) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
