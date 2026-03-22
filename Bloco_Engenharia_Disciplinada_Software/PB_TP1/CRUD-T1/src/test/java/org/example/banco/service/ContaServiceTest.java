package org.example.banco.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import org.example.banco.entity.Conta;
import org.example.banco.exception.ContaNotFoundException;
import org.example.banco.repository.ContaRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ContaServiceTest {

    @Mock
    private ContaRepository contaRepository;

    @InjectMocks
    private ContaService contaService;

    @Captor
    private ArgumentCaptor<Conta> contaCaptor;

    @Test
    @DisplayName("Deve criar conta com dados informados")
    void criarConta_salvaComDadosInformados() {
        Conta contaSalva = Conta.builder().id(10L).nome("Ana").saldo(150.0).build();
        when(contaRepository.save(any(Conta.class))).thenReturn(contaSalva);

        var dto = contaService.criarConta("Ana", 150.0);

        verify(contaRepository).save(contaCaptor.capture());
        Conta enviada = contaCaptor.getValue();
        assertThat(enviada.getNome()).isEqualTo("Ana");
        assertThat(enviada.getSaldo()).isEqualTo(150.0);
        assertThat(dto.getId()).isEqualTo(10L);
        assertThat(dto.getNome()).isEqualTo("Ana");
        assertThat(dto.getSaldo()).isEqualTo(150.0);
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar conta inexistente")
    void buscarContaPorId_lancaExcecaoQuandoNaoExiste() {
        when(contaRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ContaNotFoundException.class, () -> contaService.buscarContaPorId(99L));
    }

    @Test
    @DisplayName("Deve atualizar saldo e salvar")
    void atualizarSaldo_atualizaSaldoESalva() {
        Conta conta = Conta.builder().id(1L).nome("Joao").saldo(50.0).build();
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var dto = contaService.atualizarSaldo(1L, 200.0);

        verify(contaRepository).save(contaCaptor.capture());
        assertThat(contaCaptor.getValue().getSaldo()).isEqualTo(200.0);
        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getNome()).isEqualTo("Joao");
        assertThat(dto.getSaldo()).isEqualTo(200.0);
    }

    @Test
    @DisplayName("Deve atualizar nome e saldo da conta")
    void atualizarConta_atualizaNomeESaldo() {
        Conta conta = Conta.builder().id(2L).nome("Maria").saldo(75.0).build();
        when(contaRepository.findById(2L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var dto = contaService.atualizarConta(2L, "Maria Silva", 120.0);

        verify(contaRepository).save(contaCaptor.capture());
        Conta atualizada = contaCaptor.getValue();
        assertThat(atualizada.getNome()).isEqualTo("Maria Silva");
        assertThat(atualizada.getSaldo()).isEqualTo(120.0);
        assertThat(dto.getId()).isEqualTo(2L);
        assertThat(dto.getNome()).isEqualTo("Maria Silva");
        assertThat(dto.getSaldo()).isEqualTo(120.0);
    }

    @Test
    @DisplayName("Deve excluir conta existente")
    void excluirConta_removeQuandoExiste() {
        when(contaRepository.existsById(3L)).thenReturn(true);
        contaService.excluirConta(3L);
        verify(contaRepository).deleteById(3L);
    }

    @Test
    @DisplayName("Deve retornar lista vazia quando não há contas cadastradas")
    void listarTodasContas_retornaListaVazia() {
        when(contaRepository.findAll()).thenReturn(List.of());
        var lista = contaService.listarTodasContas();
        assertThat(lista).isEmpty();
    }

    @Test
    @DisplayName("Deve buscar conta por ID quando existe")
    void buscarContaPorId_deveRetornarDadosDaConta() {
        Conta conta = Conta.builder().id(1L).nome("Joao").saldo(100.0).build();
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));

        var dto = contaService.buscarContaPorId(1L);

        verify(contaRepository).findById(1L);
        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getNome()).isEqualTo("Joao");
        assertThat(dto.getSaldo()).isEqualTo(100.0);
    }

    @Test
    @DisplayName("Deve retornar lista completa de contas")
    void listarTodasContas_retornaListaCompleta() {
        Conta conta1 = Conta.builder().id(1L).nome("Joao").saldo(100.0).build();
        Conta conta2 = Conta.builder().id(2L).nome("Maria").saldo(200.0).build();
        when(contaRepository.findAll()).thenReturn(List.of(conta1, conta2));

        var lista = contaService.listarTodasContas();

        assertThat(lista).hasSize(2);
        assertThat(lista).extracting("nome").containsExactlyInAnyOrder("Joao", "Maria");
        assertThat(lista).extracting("saldo").containsExactlyInAnyOrder(100.0, 200.0);
    }

    @Test
    @DisplayName("Deve lançar exceção ao excluir conta inexistente")
    void excluirConta_deveLancarExcecaoQuandoContaNaoExiste() {
        when(contaRepository.existsById(99L)).thenReturn(false);
        assertThrows(ContaNotFoundException.class, () -> contaService.excluirConta(99L));
    }

    @Test
    @DisplayName("Deve lançar exceção ao atualizar saldo de conta inexistente")
    void atualizarSaldo_deveLancarExcecaoQuandoContaNaoExiste() {
        when(contaRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ContaNotFoundException.class, () -> contaService.atualizarSaldo(99L, 100.0));
    }

    @Test
    @DisplayName("Deve lançar exceção ao atualizar conta inexistente")
    void atualizarConta_deveLancarExcecaoQuandoContaNaoExiste() {
        when(contaRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ContaNotFoundException.class, () -> contaService.atualizarConta(99L, "Novo Nome", 100.0));
    }
}

