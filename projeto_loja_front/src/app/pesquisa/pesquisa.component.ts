import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';



@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {

  public mensagem: string = "";
  public exibirModal: boolean = false; // Controla a visibilidade do modal
  public produtoSelecionado: Produto  | null = null;
  public lista: Produto[] = [];
  public busca:string = "";

  public constructor(private service: ProdutoService){
    this.mensagem = "Nenhum resultado para sua pesquisa";
  }

  public pesquisar(){
    this.service.pesquisar(this.busca).subscribe(
      (data: Produto[]) => {    
        if(data==null){
          this.mensagem = "Produtos não encontrados!";
        } else {        
          this.mensagem = "resultado da pesquisa por:"+ this.busca;
          this.lista = data;
        }
      } , 
      (error) => {
        this.mensagem = "ocorreu um erro no carregamento da vitrine !"+ error;
      }
    )        
  }

  public comprar(produto: Produto){
    let novo: Item = new Item();
    novo.codigo = produto.codigo;
    novo.nome = produto.nome;
    novo.tamanho = produto.tamanho;
    novo.valorUnitario = produto.preco;
    novo.quantidade = 1;
    novo.valorTotal = produto.preco;

    let lista: Item[] = JSON.parse(localStorage.getItem("cesta") || '[]');
    let itemExistente = lista.find(item => item.codigo === novo.codigo);

    if (itemExistente) {
      itemExistente.quantidade += 1;
      itemExistente.valorTotal += produto.preco;
    } else {
    lista.push(novo);
    }

    localStorage.setItem("cesta",JSON.stringify(lista));
    this.mostrarMensagem("Produto adicionado ao carrinho!");
    this.exibirModal = true;
  }

  public mostrarMensagem(mensagem: string) {
    this.mensagem = mensagem;
    this.exibirModal = true;
  }

  public irCarrinho(){
    window.location.href="./cesta";
  }

  public abrirDetalhe(produto: Produto){
    localStorage.setItem("detalhe",JSON.stringify(produto.codigo));
    window.location.href="./detalhe";
  }
}
