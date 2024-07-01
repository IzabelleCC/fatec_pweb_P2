export class Produto {
    public codigo: number;
    public categoria: string;
    public nome: string;
    public descricao: string;
    public tamanho: string;
    public estoque: number;
    public preco: number;
    constructor(){
        this.codigo = 0;
        this.categoria = "";
        this.nome = "";
        this.descricao = "";
        this.tamanho = "";
        this.estoque = 0;
        this.preco = 0;
    }
}
