package org.example.banco.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContaRequestDTO {
    private String nome;
    private Double saldo;
}

