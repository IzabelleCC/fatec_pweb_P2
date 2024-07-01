package com.fatec.projeto_loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.fatec.projeto_loja.entity.ItemEntity;


@Repository
public interface ItemRepository  
extends JpaRepository<ItemEntity, Integer>, 
JpaSpecificationExecutor<ItemEntity>{

}
