import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../model/item';
import { Pedido } from '../model/pedido';
import { Cliente } from '../model/cliente';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [PedidoService]
})
export class PedidoComponent implements OnInit {
  public cliente: Cliente | null = null;
  public itens: Item[] = [];
  public pedido: Pedido | null = null;
  public mensagem: string = "";
  public pedidoSalvo: Pedido | null = null;
  public exibirEfetuarPagamento: boolean = false;
  public exibirFinalizarPagamento: boolean = false;

  @ViewChild('modalPagamento') modalPagamento!: TemplateRef<any>;
  @ViewChild('modalSucessoPagamento') modalSucessoPagamento!: TemplateRef<any>;

  constructor(private pedidoService: PedidoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const clienteData = localStorage.getItem('cliente');
      if (clienteData == null) {
        this.mensagem = 'Você precisa estar logado para acessar o pedido!';
      } else {
        this.cliente = JSON.parse(clienteData);
        this.pedido = new Pedido();
        const itensData = localStorage.getItem('cesta');
        if (itensData) {
          this.itens = JSON.parse(itensData);
          const totalItens = this.itens.reduce((total, item) => total + item.valorTotal, 0);
          const frete = calcularFrete(totalItens, this.cliente?.estado == null ? '' : this.cliente?.estado);
          this.pedido.total = totalItens + frete;
          this.pedido.frete = frete;
          this.pedido.dataPedido = formatarData(new Date());
          this.pedido.status = 'Aguardando pagamento';
          this.pedido.codigo = numeroPedido(new Date());
          this.pedido.codigoCliente = this.cliente?.codigo == null ? 0 : this.cliente?.codigo;
          this.pedido.entrega = `${this.cliente?.logradouro}, ${this.cliente?.numero}, ${this.cliente?.bairro}, ${this.cliente?.cidade} - ${this.cliente?.estado} - ${this.cliente?.cep}`;
        }
      }
    }
  }

  salvarPedido(): void {
    if (this.pedido) {
      this.pedidoService.gravar(this.pedido).subscribe({
        next: (pedidoSalvo) => {
          this.pedidoSalvo = pedidoSalvo;
          this.modalService.open(this.modalPagamento);
        },
        error: (erro) => {
          this.mensagem = 'Ocorreu um erro durante a gravação!';
        }
      });
    }
    this.limpar();
  }

  limpar(): void {
    this.itens = [];
    localStorage.removeItem("cesta");
  }

  efetuarPagamento(): void {
    this.exibirFinalizarPagamento = true;
    this.mensagem = 'Pagamento efetuado com sucesso!';
    this.modalService.open(this.modalSucessoPagamento);
    this.pedido = null;
  }

  pagamento(){
    window.location.href = './vitrine';
  }

}

// Função para obter componentes da data
function obterComponentesData(data: Date): { dia: string, mes: string, ano: string, horas: string, minutos: string, segundos: string } {
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0!
  const ano = data.getFullYear().toString();
  const horas = data.getHours().toString().padStart(2, '0');
  const minutos = data.getMinutes().toString().padStart(2, '0');
  const segundos = data.getSeconds().toString().padStart(2, '0');
  return { dia, mes, ano, horas, minutos, segundos };
}

// Função para formatar a data
function formatarData(data: Date): string {
  const { dia, mes, ano, horas, minutos, segundos } = obterComponentesData(data);
  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

// Função para gerar número de pedido
function numeroPedido(data: Date): string {
  const { dia, mes, ano, horas, minutos, segundos } = obterComponentesData(data);
  return `${dia}${mes}${ano}${horas}${minutos}${segundos}`;
}

// Função para calcular o frete
function calcularFrete(total: number, estado: string): number {
  if (total > 289) {
    return 0;
  }

  const fretesPorEstado: { [key: string]: number } = {
    'AC': 25, 'AL': 20, 'AP': 23, 'AM': 30, 'BA': 18, 'CE': 22, 'DF': 15, 'ES': 14, 'GO': 17, 'MA': 26,
    'MT': 19, 'MS': 21, 'MG': 16, 'PA': 24, 'PB': 28, 'PR': 13, 'PE': 27, 'PI': 29, 'RJ': 12, 'RN': 31,
    'RS': 11, 'RO': 32, 'RR': 33, 'SC': 10, 'SP': 9, 'SE': 34, 'TO': 35
  };
  
  return fretesPorEstado[estado];
}
