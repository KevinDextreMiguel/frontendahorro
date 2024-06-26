import { Cuenta } from "./cuenta";

export class Transaccion {
    idTransaccion: number = 0
    fechaTransaccion: Date = new Date(Date.now());
    tipoTransaccion: string = ""
    montoTransaccion: number = 0.0
    cuenta:Cuenta=new Cuenta()
}