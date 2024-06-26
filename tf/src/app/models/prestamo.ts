import { Cliente } from "./cliente";
export class Prestamo{
    idPrestamo:number=0
    montoPrestamo: number = 0.0
    diaPagoMensual: number = 0
    tipoCredito:string=""
    tasa: number = 0.0
    tipoTasa: string = ""
    periodoGracia:number=0
    tasaMoratoria: number = 0.0
    fecha_inicial: Date = new Date()
    fecha_vencimiento: Date = new Date()
    monto_final: number = 0
    interesPrestamo: number = 0
    cuota: number = 0
    ineteres_cuota: number = 0
    cantidad_cuota: number = 0
    saldo:number=0
    estadoPrestamo:string=""
    cliente: Cliente = new Cliente()
}