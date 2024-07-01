import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  public mensagem: string = "";
  public cliente: Cliente | null = null;

  constructor() {
    let json = localStorage.getItem("cliente");
    if (json == null) {
      this.mensagem = "Nenhum usuário logado!";
    } else {
      this.cliente = JSON.parse(json);
      if (this.cliente) {
        this.mensagem = this.cliente.nome + " deseja fazer logout?";
      }
    }
  }

  fazerLogout() {
    localStorage.removeItem("cliente");
    this.mensagem = "Usuário deslogado com sucesso!";
    this.cliente = null;
  }

  irParaDados() {
    window.location.href = "./dadosCliente";
  }
}
