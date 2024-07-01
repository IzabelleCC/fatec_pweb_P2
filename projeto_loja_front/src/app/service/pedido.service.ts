import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  public gravar(obj: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>("http://localhost:8090/api/pedido", obj);
  }

  public alterar(obj: Pedido): Observable<string> {
    return new Observable(observer => {
      this.http.put<string>("http://localhost:8090/api/pedido", obj).subscribe({
        next: data => {
          observer.next("Registro alterado com sucesso!");
          observer.complete();
        },
        error: error => {
          console.error(error);
          observer.error("Ocorreu um erro durante a gravação!");
        }
      });
    });
  }

  public remover(obj: Pedido): Observable<string> {
    return new Observable(observer => {
      this.http.delete<string>(`http://localhost:8090/api/pedido/${obj.codigo}`).subscribe({
        next: data => {
          observer.next("Registro removido com sucesso!");
          observer.complete();
        },
        error: error => {
          console.error(error);
          observer.error("Ocorreu um erro durante a gravação!");
        }
      });
    });
  }

  public carregar(codigo: string): Observable<Pedido> {
    return this.http.get<Pedido>(`http://localhost:8090/api/pedido/${codigo}`);
  }

  public listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`http://localhost:8090/api/pedidos`);
  }
}
