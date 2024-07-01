// login.component.ts
import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public mensagem: string = "";
  public cliente: Cliente = new Cliente();
  public showModal: boolean = false;
  public mensagemModal: string = "";

  constructor(private service: ClienteService){}

  public entrar() {
    this.service.login(this.cliente).subscribe(
      (data: Cliente) => {  
        if(data != null){
          if(typeof window !== 'undefined'){
            localStorage.setItem("cliente", JSON.stringify(data));
          }
          window.location.href = "./dadosCliente";
        } else {
          this.mensagem = "Email ou senha inválidos !!!";
        }
      }, 
      (error) => {
        this.mensagem = "Ocorreu um erro, tente mais tarde !!!";
      }
    );
  }

  public openModal() {
    this.showModal = true;
  }

  public closeModal() {
    this.mensagemModal = "";
    this.showModal = false;
  }

  public enviarSenha() {
    this.service.enviarSenha(this.cliente).subscribe(
      (response: Cliente) => {
        if(response != null){
            this.mensagemModal = "Instruções de redefinição de senha enviadas para o email.";
        }
        else{
          this.mensagemModal = "Email não encontrado !!!";
        }
      },
      (error) => {
        this.mensagem = "Ocorreu um erro, tente mais tarde !!!";
      }
    );
  }
}
