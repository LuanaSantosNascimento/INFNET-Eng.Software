package org.example.banco.util;

import java.util.Scanner;
import lombok.RequiredArgsConstructor;
import org.example.banco.service.ContaService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MenuConsole {

    private final ContaService contaService;
    private final InputValidator inputValidator = new InputValidator(new Scanner(System.in));

    private static final String SEPARADOR = "=".repeat(60);
    private static final String LINHA = "-".repeat(60);

    public void iniciar() {
        exibirBanner();
        boolean continuar = true;

        while (continuar) {
            exibirMenu();
            int opcao = inputValidator.lerInt("");
            continuar = processarOpcao(opcao);
        }

        exibirMensagemFinalizacaoSistema();
    }

    private void exibirBanner() {
        System.out.println("\n" + SEPARADOR);
        System.out.println("\t\tSISTEMA DE GERENCIAMENTO DE CONTAS BANCÁRIAS");
        System.out.println(SEPARADOR + "\n");
    }

    private void exibirMenu() {
        System.out.println("\n" + LINHA);
        System.out.println("\t\t\t\t\t\tMENU PRINCIPAL");
        System.out.println(LINHA);
        System.out.println("\t[1] Listar todas as contas");
        System.out.println("\t[2] Buscar conta por ID");
        System.out.println("\t[3] Criar nova conta");
        System.out.println("\t[4] Atualizar conta");
        System.out.println("\t[5] Atualizar saldo");
        System.out.println("\t[6] Excluir conta");
        System.out.println("\t[0] Sair");
        System.out.println(LINHA);
        System.out.print("\nEscolha uma opção: ");
    }

    private boolean processarOpcao(int opcao) {
        try {
            switch (opcao) {
                case 1 -> listarTodasContas();
                case 2 -> buscarContaPorId();
                case 3 -> criarNovaConta();
                case 4 -> atualizarConta();
                case 5 -> atualizarSaldo();
                case 6 -> excluirConta();
                case 0 -> {
                    return false;
                }
                default -> exibirMensagemErro("Opção inválida. Escolha uma das opções informadas no menu.");
            }
        } catch (Exception e) {
            exibirMensagemErro("Erro: " + e.getMessage());
        }
        return true;
    }

    private void listarTodasContas() {

        exibirTitulo("LISTA DE CONTAS");
        contaService.listarTodasContas();
    }

    private void buscarContaPorId() {
        exibirTitulo("BUSCAR CONTA POR ID");
        Long id = inputValidator.lerLong("Digite o ID da conta: ");
        if (id == null) {
            return;
        }
        contaService.buscarContaPorId(id);
    }

    private void criarNovaConta() {
        exibirTitulo("CRIAR NOVA CONTA");
        String nome = inputValidator.lerString("Nome do titular: ");
        if (nome == null) {
            return;
        }
        Double saldo = inputValidator.lerDouble("Saldo inicial: R$ ");

        if (saldo == null) {
            return;
        }
        if (!inputValidator.validarSaldoPositivo(saldo)) {
            return;
        }

        contaService.criarConta(nome, saldo);
    }

    private void atualizarConta() {
        exibirTitulo("ATUALIZAR CONTA");

        Long id = inputValidator.lerLong("Digite o ID da conta: ");
        if (id == null) {
            return;
        }

        String nome = inputValidator.lerString("Novo nome do titular: ");
        if (nome == null) {
            return;
        }

        Double saldo = inputValidator.lerDouble("Novo saldo: R$ ");
        if (saldo == null) {
            return;
        }

        if (!inputValidator.validarSaldoPositivo(saldo)) {
            return;
        }

        contaService.atualizarConta(id, nome, saldo);
    }

    private void atualizarSaldo() {
        exibirTitulo("ATUALIZAR SALDO");

        Long id = inputValidator.lerLong("Digite o ID da conta: ");
        if (id == null) {
            return;
        }

        Double novoSaldo = inputValidator.lerDouble("Novo saldo: R$ ");
        if (novoSaldo == null) {
            return;
        }

        if (!inputValidator.validarSaldoPositivo(novoSaldo)) {
            return;
        }

        contaService.atualizarSaldo(id, novoSaldo);
    }

    private void excluirConta() {
        exibirTitulo("EXCLUIR CONTA");

        Long id = inputValidator.lerLong("Digite o ID da conta: ");
        if (id == null) {
            return;
        }
        contaService.excluirConta(id);
    }

    private void exibirTitulo(String titulo) {
        System.out.println("\n" + LINHA);
        System.out.println("  " + titulo);
        System.out.println(LINHA);
    }

    private void exibirMensagemErro(String mensagem) {
        System.out.println("\n✗ " + mensagem);
    }

    private void exibirMensagemFinalizacaoSistema() {
        System.out.println("\n" + SEPARADOR);
        System.out.println("\tFinalizando o sistema.");
        System.out.println(SEPARADOR + "\n");
    }
}
