package com.fatec.projeto_loja.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fatec.projeto_loja.entity.ClienteEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import com.fatec.projeto_loja.repository.ClienteRepository;

@RestController
@CrossOrigin("*")

public class ClienteController {

    @Autowired
    ClienteRepository repository;
    
    @GetMapping("/api/cliente/{codigo}")
    public ResponseEntity<ClienteEntity> carregar (@PathVariable int codigo) {
        Optional<ClienteEntity> cliente = repository.findById(codigo);
        if(cliente.isPresent()){
            return ResponseEntity.ok(cliente.get());
        }
        else{
            return ResponseEntity.ok(null);
        }
    }

    @PostMapping("/api/cliente")
    public ResponseEntity<String> gravar (@RequestBody ClienteEntity cliente) {
        repository.save(cliente);
        return ResponseEntity.ok("Cliente cadastrado com sucesso");
    }
    
    @PutMapping("api/cliente")
    public ResponseEntity<String> alterar (@RequestBody ClienteEntity cliente) {
        repository.save(cliente);
        return ResponseEntity.ok("Cliente alterado com sucesso");
    }

    @DeleteMapping("api/cliente/{codigo}")
    public ResponseEntity<String> delete (@PathVariable int codigo) {
        repository.deleteById(codigo);
        return ResponseEntity.ok("Cliente excluído com sucesso");
    }

    @GetMapping("/api/clientes")
    public ResponseEntity<List<ClienteEntity>> listar() {
        return ResponseEntity.ok(repository.findAll());
    }
    
        
    @PostMapping("/api/cliente/login")
    public ResponseEntity<ClienteEntity> fazerLogin(@RequestBody ClienteEntity cliente){
        Optional<ClienteEntity> retorno = 
                repository.fazerLogin(cliente.getEmail(), cliente.getSenha());
        if(retorno.isPresent()){
            return ResponseEntity.ok(retorno.get());
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @PostMapping("/api/cliente/esqueci")
    public ResponseEntity<ClienteEntity> esqueciSenha(@RequestBody ClienteEntity cliente){
        Optional<ClienteEntity> retorno = 
                repository.esqueciSenha(cliente.getEmail());
        if(retorno.isPresent()){
            return ResponseEntity.ok(retorno.get());
        } else {
            return ResponseEntity.ok(null);
        }
    }    



}
