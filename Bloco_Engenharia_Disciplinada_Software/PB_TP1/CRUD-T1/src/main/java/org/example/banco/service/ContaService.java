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

    @Transactional
    public ContaResponseDTO criarConta(String nome, Double saldo) {

        Conta conta = Conta.builder()
                .nome(nome)
                .saldo(saldo)
                .build();

        Conta contaSalva = contaRepository.save(conta);

        return ContaResponseDTO.fromEntity(contaSalva);
    }

    @Transactional(readOnly = true)
    public ContaResponseDTO buscarContaPorId(Long id) {

        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));

        return ContaResponseDTO.fromEntity(conta);
    }

    @Transactional(readOnly = true)
    public List<ContaResponseDTO> listarTodasContas() {

        List<Conta> contas = contaRepository.findAll();

        return contas.stream()
                .map(ContaResponseDTO::fromEntity)
                .toList();
    }

    @Transactional
    public ContaResponseDTO atualizarSaldo(Long id, Double novoSaldo) {

        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));

        conta.setSaldo(novoSaldo);
        Conta contaAtualizada = contaRepository.save(conta);

        return ContaResponseDTO.fromEntity(contaAtualizada);
    }

    @Transactional
    public ContaResponseDTO atualizarConta(Long id, String nome, Double saldo) {

        Conta conta = contaRepository.findById(id)
                .orElseThrow(() -> new ContaNotFoundException(id));

        conta.setNome(nome);
        conta.setSaldo(saldo);

        Conta contaAtualizada = contaRepository.save(conta);

        return ContaResponseDTO.fromEntity(contaAtualizada);
    }

    @Transactional
    public void excluirConta(Long id) {
        if (!contaRepository.existsById(id)) {
            throw new ContaNotFoundException(id);
        }
        contaRepository.deleteById(id);
    }
}
