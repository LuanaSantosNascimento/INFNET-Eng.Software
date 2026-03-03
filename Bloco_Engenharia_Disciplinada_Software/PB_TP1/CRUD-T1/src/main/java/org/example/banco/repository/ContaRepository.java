package org.example.banco.repository;

import org.example.banco.entity.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaRepository extends JpaRepository<Conta, Long>  {
}
