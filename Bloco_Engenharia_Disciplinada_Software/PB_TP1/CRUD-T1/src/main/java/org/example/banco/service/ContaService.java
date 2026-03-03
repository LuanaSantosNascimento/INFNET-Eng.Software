package org.example.banco.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.banco.dto.ContaResponseDTO;
import org.example.banco.entity.Conta;
import org.example.banco.exception.ContaNotFoundException;
import org.example.banco.repository.ContaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContaService {

    private final ContaRepository contaRepository;
    private static final String LINHA = "-".repeat(60);

    @Transactional
    public void criarConta(String nome, Double saldo) {

        Conta conta = Conta.builder()
                .nome(nome)
                .saldo(saldo)
                .build();

        Conta contaSalva = contaRepository.save(conta);
        System.out.println("\n---> Conta criada com sucesso.");
        exibirDetalheConta(ContaResponseDTO.fromEntity(contaSalva));
    }

    @Transactional(readOnly = true)
    public void buscarContaPorId(Long id) {

        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));
        exibirDetalheConta(ContaResponseDTO.fromEntity(conta));
    }

    @Transactional(readOnly = true)
    public void listarTodasContas() {

        List<ContaResponseDTO> contas = contaRepository.findAll()
                .stream()
                .map(ContaResponseDTO::fromEntity)
                .toList();

        if (contas.isEmpty()) {
            System.out.println("Nenhuma conta encontrada.");
            return;
        }

        System.out.println(LINHA);
        System.out.printf("%-5s | %-30s | %15s%n", "ID", "NOME", "SALDO");
        System.out.println(LINHA);

        contas.forEach(conta ->
                System.out.printf("%-5d | %-30s | R$ %12.2f%n",
                        conta.getId(),
                        conta.getNome(),
                        conta.getSaldo())
        );

        System.out.println(LINHA);
        System.out.printf("Total de contas: %d%n", contas.size());
    }

    @Transactional
    public void atualizarSaldo(Long id, Double novoSaldo) {

        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));

        conta.setSaldo(novoSaldo);
        Conta contaAtualizada = contaRepository.save(conta);

        System.out.println("\n---> Saldo atualizado com sucesso.");
        exibirDetalheConta(ContaResponseDTO.fromEntity(contaAtualizada));
    }

    @Transactional
    public void atualizarConta(Long id, String nome, Double saldo) {

        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));

        conta.setNome(nome);
        conta.setSaldo(saldo);

        Conta contaAtualizada = contaRepository.save(conta);

        System.out.println("\n---> Conta atualizada com sucesso.");
        exibirDetalheConta(ContaResponseDTO.fromEntity(contaAtualizada));
    }

    @Transactional
    public void excluirConta(Long id) {

        Conta contaEntity = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));

        exibirDetalheConta(ContaResponseDTO.fromEntity(contaEntity));
        contaRepository.deleteById(id);
        System.out.println("\n---> Conta excluída com sucesso.");
    }

    private void exibirDetalheConta(ContaResponseDTO conta) {
        System.out.println("\n" + LINHA);
        System.out.println("DETALHES DA CONTA");
        System.out.println(LINHA);
        System.out.printf("ID:    %d%n", conta.getId());
        System.out.printf("Nome:  %s%n", conta.getNome());
        System.out.printf("Saldo: R$ %.2f%n", conta.getSaldo());
        System.out.println(LINHA);
    }
}
