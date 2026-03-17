package org.example.banco.controller;

import lombok.RequiredArgsConstructor;
import org.example.banco.dto.ContaResponseDTO;
import org.example.banco.dto.ContaRequestDTO;
import org.example.banco.service.ContaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contas")
@RequiredArgsConstructor
public class ContaController {
    private final ContaService contaService;

    @GetMapping
    public ResponseEntity<List<ContaResponseDTO>> listarTodasContas() {
        List<ContaResponseDTO> contas = contaService.listarTodasContas();
        return ResponseEntity.ok(contas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContaResponseDTO> buscarContaPorId(@PathVariable Long id) {
        ContaResponseDTO conta = contaService.buscarContaPorId(id);
        return ResponseEntity.ok(conta);
    }

    @PostMapping
    public ResponseEntity<ContaResponseDTO> criarNovaConta(@RequestBody ContaRequestDTO contaDTO) {
        ContaResponseDTO novaConta = contaService.criarConta(contaDTO.getNome(), contaDTO.getSaldo());
        return ResponseEntity.ok(novaConta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContaResponseDTO> atualizarConta(@PathVariable Long id, @RequestBody ContaRequestDTO contaDTO) {
        ContaResponseDTO contaAtualizada = contaService.atualizarConta(id, contaDTO.getNome(), contaDTO.getSaldo());
        return ResponseEntity.ok(contaAtualizada);
    }

    @PatchMapping("/{id}/saldo")
    public ResponseEntity<ContaResponseDTO> atualizarSaldo(@PathVariable Long id, @RequestBody ContaRequestDTO contaDTO) {
        ContaResponseDTO contaAtualizada = contaService.atualizarSaldo(id, contaDTO.getSaldo());
        return ResponseEntity.ok(contaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirConta(@PathVariable Long id) {
        contaService.excluirConta(id);
        return ResponseEntity.noContent().build();
    }
}
