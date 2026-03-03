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
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;

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

        contaService.criarConta("Ana", 150.0);

        verify(contaRepository).save(contaCaptor.capture());
        Conta enviada = contaCaptor.getValue();
        assertThat(enviada.getNome()).isEqualTo("Ana");
        assertThat(enviada.getSaldo()).isEqualTo(150.0);
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

        contaService.atualizarSaldo(1L, 200.0);

        verify(contaRepository).save(contaCaptor.capture());
        assertThat(contaCaptor.getValue().getSaldo()).isEqualTo(200.0);
    }

    @Test
    @DisplayName("Deve atualizar nome e saldo da conta")
    void atualizarConta_atualizaNomeESaldo() {
        Conta conta = Conta.builder().id(2L).nome("Maria").saldo(75.0).build();
        when(contaRepository.findById(2L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenAnswer(invocation -> invocation.getArgument(0));

        contaService.atualizarConta(2L, "Maria Silva", 120.0);

        verify(contaRepository).save(contaCaptor.capture());
        Conta atualizada = contaCaptor.getValue();
        assertThat(atualizada.getNome()).isEqualTo("Maria Silva");
        assertThat(atualizada.getSaldo()).isEqualTo(120.0);
    }

    @Test
    @DisplayName("Deve excluir conta existente")
    void excluirConta_removeQuandoExiste() {
        Conta conta = Conta.builder().id(3L).nome("Pedro").saldo(10.0).build();
        when(contaRepository.findById(3L)).thenReturn(Optional.of(conta));

        contaService.excluirConta(3L);

        verify(contaRepository).deleteById(3L);
    }

    @ExtendWith(OutputCaptureExtension.class)
    @Test
    @DisplayName("Deve informar quando não há contas cadastradas")
    void listarTodasContas_informaQuandoVazio(CapturedOutput output) {
        when(contaRepository.findAll()).thenReturn(List.of());

        contaService.listarTodasContas();

        assertThat(output.getOut()).contains("Nenhuma conta encontrada.");
    }

    @Test
    @DisplayName("Deve buscar conta por ID quando existe")
    void buscarContaPorId_deveRetornarDadosDaConta() {
        Conta conta = Conta.builder().id(1L).nome("Joao").saldo(100.0).build();
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));

        contaService.buscarContaPorId(1L);

        verify(contaRepository).findById(1L);
    }

    @ExtendWith(OutputCaptureExtension.class)
    @Test
    @DisplayName("Deve exibir lista completa de contas")
    void listarTodasContas_deveExibirListaCompleta(CapturedOutput output) {
        Conta conta1 = Conta.builder().id(1L).nome("Joao").saldo(100.0).build();
        Conta conta2 = Conta.builder().id(2L).nome("Maria").saldo(200.0).build();
        when(contaRepository.findAll()).thenReturn(List.of(conta1, conta2));

        contaService.listarTodasContas();

        assertThat(output.getOut())
                .contains("Joao")
                .contains("Maria")
                .contains("Total de contas: 2");
    }

    @Test
    @DisplayName("Deve lançar exceção ao excluir conta inexistente")
    void excluirConta_deveLancarExcecaoQuandoContaNaoExiste() {
        when(contaRepository.findById(99L)).thenReturn(Optional.empty());

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

