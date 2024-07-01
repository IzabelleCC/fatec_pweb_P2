import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Item } from '../model/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent {
  public lista: Item[] = [];
  public mensagem: String = "";
  public totalCesta: number = 0;


  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    if (isPlatformBrowser(this.platformId)) {
      let json = localStorage.getItem("cesta");
      if (json == null) {
        this.mensagem = "Seu carrinho de compras está vazio !!!";
      } else {
        this.lista = JSON.parse(json);
        this.lista.forEach(item => {
          this.totalCesta += item.valorTotal;
        });
      }
    }
  }

  excluirItem(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.totalCesta -= this.lista[index].valorTotal; // Subtrai o valor do item do total da cesta
      this.lista.splice(index, 1); // Remove o item do array

      if (this.lista.length === 0) {
        this.mensagem = 'Sua cesta de compras está vazia!';
        localStorage.removeItem('cesta'); // Limpa a cesta se estiver vazia
      } else {
        localStorage.setItem('cesta', JSON.stringify(this.lista)); // Atualiza a cesta no localStorage
      }
    }
  }

  limpar() {
    if (isPlatformBrowser(this.platformId)) {
      this.lista = [];
      localStorage.removeItem("cesta");
    }
  }

  irPedido() { 
    if (isPlatformBrowser(this.platformId)) {
      if (this.lista.length === 0) {
        this.mensagem = 'Sua cesta de compras está vazia!';
      } else {
        window.location.href = '/pedido';
      }
    }
  }
  
}
