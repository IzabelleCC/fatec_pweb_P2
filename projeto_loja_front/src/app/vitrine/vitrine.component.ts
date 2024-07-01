import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent{

  public mensagem: string = "";
  public exibirModal: boolean = false; // Controla a visibilidade do modal
  public exibirModalCarrinho: boolean = false;

  public produtoSelecionado: Produto  | null = null;
  public lista: Produto[] = []; 

  public constructor(private service: ProdutoService){
    this.mensagem = "";
    this.service.listar().subscribe(
      (data: Produto[]) => {    
        if(data==null){
          this.mensagem = "Produtos não encontrados!";
        } else {        
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
