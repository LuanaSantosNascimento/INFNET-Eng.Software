package org.example.banco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.banco.entity.Conta;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContaResponseDTO {

    private Long id;
    private String nome;
    private Double saldo;

    public static ContaResponseDTO fromEntity(Conta conta) {
        return new ContaResponseDTO(
            conta.getId(),
            conta.getNome(),
            conta.getSaldo()
        );
    }
}

