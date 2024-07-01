import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dadosCliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dadosCliente.component.html',
  styleUrls: ['./dadosCliente.component.css']
})
export class DadosClienteComponent implements OnInit {
  public cliente: Cliente | null = null;

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const clienteData = localStorage.getItem('cliente');
      if (clienteData) {
        this.cliente = JSON.parse(clienteData);
      }
    } else {
      console.warn('localStorage não está disponível');
    }
  }

  public formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    let value = telefone.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    return value;
  }

  public formatarCPF(cpf: string): string {
    if (!cpf) return '';
    let value = cpf.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return value;
  }

  public formatarCEP(cep: string): string {
    if (!cep) return '';
    let value = cep.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    return value;
  }
}
