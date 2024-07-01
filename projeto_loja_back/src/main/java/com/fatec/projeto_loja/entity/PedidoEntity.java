package com.fatec.projeto_loja.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "pedido")
public class PedidoEntity {
    @Id
    private String codigo;
    private int codigoCliente;
    private double frete;
    private double total;
    private String status;
    private String entrega;
    private String dataPedido;

    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public int getCodigoCliente() {
        return codigoCliente;
    }
    public void setCodigoCliente(int codigoCliente) {
        this.codigoCliente = codigoCliente;
    }
    public double getFrete() {
        return frete;
    }
    public void setFrete(double frete) {
        this.frete = frete;
    }
    public double getTotal() {
        return total;
    }
    public void setTotal(double total) {
        this.total = total;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getEntrega() {
        return entrega;
    }
    public void setEntrega(String entrega) {
        this.entrega = entrega;
    }
    public String getDataPedido() {
        return dataPedido;
    }
    public void setDataPedido(String dataPedido) {
        this.dataPedido = dataPedido;
    }
}
