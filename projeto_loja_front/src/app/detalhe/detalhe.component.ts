import { Component,  OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent implements OnInit{
  public mensagem: String = "";
  public produto : Produto = new Produto();
  public exibirModal: boolean = false;
  public exibirModalTabela: boolean = false;
  public produtoSelecionado: Produto  | null = null;
  public lista: Produto[] = [];

  constructor(private service: ProdutoService) { }

  ngOnInit() {
    let codigo = localStorage.getItem("detalhe");
    if (!codigo) {
      this.mensagem = "Produto não encontrado!!!";
    } else {
      this.carregarProduto(codigo);
    }
  }

  private carregarProduto(codigo: string) {
    this.service.carregar(codigo).subscribe(
      (data: Produto) => {
        if (!data) {
          this.mensagem = "Produto não encontrado!";
        } else {
          this.produto = data;
        }
      },
      (error) => {
        console.error(error);
        this.mensagem = "Ocorreu um erro no carregamento do detalhe! " + (error.message || "Erro desconhecido");
      }
    );
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

  public abrirTabelaMedidas() {
    this.exibirModalTabela = true;
  }

  public fecharTabelaMedidas() {
    this.exibirModalTabela = false;
  }
  
}
