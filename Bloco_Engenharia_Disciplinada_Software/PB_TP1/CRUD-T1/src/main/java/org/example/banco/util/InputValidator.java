package org.example.banco.util;

import java.util.InputMismatchException;
import java.util.Scanner;

public class InputValidator {

    private final Scanner scanner;

    public InputValidator(Scanner scanner) {
        this.scanner = scanner;
    }

    public int lerInt(String mensagem) {
        try {
            System.out.print(mensagem);
            return scanner.nextInt();
        } catch (InputMismatchException e) {
            scanner.nextLine();
            exibirErro("Entrada inválida. Digite um número inteiro.");
            return -1;
        } finally {
            scanner.nextLine();
        }
    }

    public Long lerLong(String mensagem) {
        try {
            System.out.print(mensagem);
            return scanner.nextLong();
        } catch (InputMismatchException e) {
            scanner.nextLine();
            exibirErro("Entrada inválida! Por favor, digite um número inteiro válido.");
            return null;
        } finally {
            scanner.nextLine();
        }
    }

    public Double lerDouble(String mensagem) {
        try {
            System.out.print(mensagem);
            return scanner.nextDouble();
        } catch (InputMismatchException e) {
            scanner.nextLine();
            exibirErro("Entrada inválida! Por favor, digite um número decimal válido (ex: 100.50).");
            return null;
        } finally {
            scanner.nextLine();
        }
    }

    public String lerString(String mensagem) {
        System.out.print(mensagem);
        String valor = scanner.nextLine();

        if (valor.trim().isEmpty()) {
            exibirErro("Entrada inválida! O texto não pode estar vazio.");
            return null;
        }

        return valor;
    }

    public boolean validarSaldoPositivo(Double valor) {
        if (valor == null || valor < 0) {
            exibirErro("O saldo não pode ser negativo!");
            return false;
        }
        return true;
    }

    private void exibirErro(String mensagem) {
        System.out.println("\nHouve um erro durante o processamento:  " + mensagem);
    }

}

