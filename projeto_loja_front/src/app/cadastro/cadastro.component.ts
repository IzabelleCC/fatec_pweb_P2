import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public mensagem: string = "";
  public clienteCadastro: Cliente = new Cliente(); // Usado para o cadastro 
  public exibirModal: boolean = false; // Controla a visibilidade do modal

  ngOnInit() {
    this.clienteCadastro = new Cliente();
  }

  public constructor(private clienteService: ClienteService) {
    let json = localStorage.getItem("cliente");
    if (json == null) {
      this.mensagem = "Você ainda não tem cadastro!!!";
    } else {
      this.clienteCadastro = JSON.parse(json);
    }
  }

  public gravar() {
    if (this.validarCampos()) {
      try {
        this.clienteService.gravar(this.clienteCadastro);
        this.mostrarMensagem("Registro gravado com sucesso!");
        this.limpar();
      } catch (erro) {
        this.mensagem = "Ocorreu um erro durante a gravação!";
      }
    } else {
      this.mostrarMensagem("Preencha todos os campos obrigatórios!");
    }
  }

  public validarCampos(): boolean {
    return this.isFieldValid(this.clienteCadastro.nome) &&
      this.isFieldValid(this.clienteCadastro.email) &&
      this.isFieldValid(this.clienteCadastro.telefone) &&
      this.isFieldValid(this.clienteCadastro.cpf) &&
      this.isFieldValid(this.clienteCadastro.cep) &&
      this.isFieldValid(this.clienteCadastro.logradouro) &&
      this.isFieldValid(this.clienteCadastro.numero) &&
      this.isFieldValid(this.clienteCadastro.bairro) &&
      this.isFieldValid(this.clienteCadastro.cidade) &&
      this.isFieldValid(this.clienteCadastro.estado) &&
      this.isFieldValid(this.clienteCadastro.senha);
  }

  public isFieldValid(field: any): boolean {
    return typeof field === 'string' && field.trim().length > 0;
  }

  public campoInvalido(campo: string): boolean {
    return this.exibirModal && !this.isFieldValid(this.clienteCadastro[campo as keyof Cliente]);
  }

  public alterar() {
    try {
      this.mensagem = "Registro alterado com sucesso!";
      this.clienteService.alterar(this.clienteCadastro);
      this.limpar();
    } catch (erro) {
      this.mensagem = "Ocorreu um erro durante a gravação!";
    }
  }

  public limpar() {
    this.clienteCadastro.codigo = 0;
    this.clienteCadastro.nome = "";
    this.clienteCadastro.email = "";
    this.clienteCadastro.telefone = "";
    this.clienteCadastro.cpf = "";
    this.clienteCadastro.cep = "";
    this.clienteCadastro.logradouro = "";
    this.clienteCadastro.numero = "";
    this.clienteCadastro.bairro = "";
    this.clienteCadastro.cidade = "";
    this.clienteCadastro.estado = "";
    this.clienteCadastro.complemento = "";
    this.clienteCadastro.senha = "";
  }

  public remover() {
    try {
      this.mensagem = "Registro removido com sucesso!";
      this.clienteService.remover(this.clienteCadastro);
      this.limpar();
    } catch (erro) {
      this.mensagem = "Ocorreu um erro durante a exclusão";
    }
  }

  public carregar() {
    this.mensagem = "";
    this.clienteService.carregar(this.clienteCadastro.codigo).subscribe(
      (data: Cliente) => {
        if (data == null) {
          this.mensagem = "Registro não encontrado!";
          this.limpar();
        } else {
          this.clienteCadastro = data;
        }
      },
      (error) => {
        this.mensagem = "Ocorreu um erro no carregamento do usuário: " + error;
        this.limpar();
      }
    )
  }

  public formatarTelefone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    this.clienteCadastro.telefone = value;
  }

  public formatarCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    this.clienteCadastro.cpf = value;
  }

  public formatarCEP(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    this.clienteCadastro.cep = value;
  }

  public onBlur() {
    if (this.clienteCadastro.cep) {
      this.clienteService.buscarEnderecoPorCep(this.clienteCadastro.cep).subscribe(
        data => {
          if (data) {
            this.clienteCadastro.logradouro = data.logradouro;
            this.clienteCadastro.bairro = data.bairro;
            this.clienteCadastro.cidade = data.localidade;
            this.clienteCadastro.estado = data.uf;
          }
        },
        error => {
          this.mensagem = "Erro ao buscar endereço. Verifique o CEP.";
        }
      );
    }
  }

  public onKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onBlur();
    }
  }

  public mostrarMensagem(mensagem: string) {
    this.mensagem = mensagem;
    this.exibirModal = true;
  }
}
